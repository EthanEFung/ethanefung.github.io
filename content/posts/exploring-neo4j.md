---
title: "I built a graph database - Exploring Neo4j"
date: 2022-05-29T17:34:31-07:00
cover: ""
tags: ["Graph DB", "Neo4j", "Cypher", "NBA"]
keywords: ["Cypher", "Neo4j"]
description: ""
showFullContent: false
readingTime: false
hideComments: false
---

A few years ago I learned that the nba releases json files daily to the public.
Immediately, I jumped on the opportunity to build nba related applications, yet
one thing that always stood out to me about their api is some of the difficulty
building data relationships between two collections. Take for example this
snippet of json for a collection of players
```json
[
  {
      "firstName": "Ben",
      "lastName": "Simmons",
      "teams": [
          {
              "teamId": "1610612755",
              "seasonStart": "2016",
              "seasonEnd": "2020"
          },
          {
              "teamId": "1610612751",
              "seasonStart": "2021",
              "seasonEnd": "2021"
          }
      ],
      "draft": {
          "teamId": "1610612755",
          "pickNum": "1",
          "roundNum": "1",
          "seasonYear": "2016"
      },
  }
]
```           
Here we have we have some basic information about the player such as his 
first and last name. We also have some more complex data that provides 
information about his relationship to other entities. For, example this
data shows the teams that Simmons has played for, and for how long ("seasonStart"
and "seasonEnd") but not any more information about each team except for
a team identifier. In the data above we know that Ben Simmons was the number
one pick of the 2016 draft, but the team that he was drafted to cannot
be determined solely by the teamId. This requires us to make another api
request for all the NBA Teams:
```json
[
  {
    "nickname": "76ers",
    "urlName": "sixers",
    "teamId": "1610612755",
    "altCityName": "Philadelphia",
    "tricode": "PHI",
    "teamShortName": "Philadelphia",
    "divName": "Atlantic",
    "isAllStar": false,
    "isNBAFranchise": true,
    "confName": "East",
    "fullName": "Philadelphia 76ers",
  }, 
]
```
Only once we receive the collection of teams, can we compare teamId of the draft object
against each team object and infer that Ben Simmons was drafted to the Philadelphia
76ers in 2016.

The usage of ids or keys to show relationships between entities, is a modern standard
practice when building databases because it can be inpractical to fit all of
an api's data into a single response. Generally with REST apis will have endpoints
that clients can utilize, but the data the client receives from one requests might be
too little (such as the example here) or too much. However, utilizing ids or keys 
and requiring that clients make subsequent requests has the benefit of allowing REST
apis to scale data and give the client the most relevant information while keeping 
response payloads minimal in size.

One downside to this approach is that it is relatively difficult for clients to
model many-to-many relationships. For example if I was interested in knowing which
players have played on the same team as Ben Simmons, then the following process
would need to occur:

1. request from the api all players
2. iterate over all players creating a hashmap with the teamId as the key and a
   collection of players as the value
3. iterate and find a player with first name "Ben" and last name "Simmons"
4. iterate over Ben Simmon's teams 
5. utilizing the teamId of the Simmon's team iterate over the hash map value for the team
6. check to see if the player is not Ben Simmons and iterate over the players teams
7. check to see if the players teams is the team in question
8. if conditions in step 6 and 7 are met, check to see if the season durations of the
   player and the season duration of Simmons overlap

# Embracing the relationships
I want to answer questions like the question posed in the section above, but with
the complexity abstracted away. This is where I learned about Neo4j and Cypher the
querying language that takes a similiar declarative style as SQL but without the complex joins
required in relational databases to receive back information about entity relationships.
Using, Cypher I'd be able to write a simple statements about multiple collections, but
first I needed to build out the dataset.

Using Go, I built an api scraper that loads the nba data into a Neo4j instance. First,
I focused on loading the NBA teams into the instance.

```go

type TeamsJSON struct {
	League struct {
		Standard []FetchedTeam `json:"standard"`
	} `json:"league"`
}

type FetchedTeam struct {
	FullName       string `json:"fullName"`
	City           string `json:"city"`
	TeamShortName  string `json:"teamShortName"`
	IsNBAFranchise bool   `json:"isNBAFranchise"`
	ConferenceName string `json:"confName"`
	Tricode        string `json:"tricode"`
	DivisionName   string `json:"divName"`
	IsAllStar      bool   `json:"isAllStar"`
	Nickname       string `json:"nickname"`
	URLName        string `json:"urlName"`
	TeamID         string `json:"teamId"`
}

func fetchTeams() ([]FetchedTeam, error) {
	var teams TeamsJSON
	err := fetchAndUnmarshal("nba-url.here.com", &teams)
	if err != nil {
		return nil, err
	}
	return teams.League.Standard, nil
}
```
Then I needed to take this collection and create Graph "Nodes"
```go
  teams, err := fetchTeams()
  if err != nil {
	log.Fatal(err)
  }
  err = createTeams(teams)
  if err != nil {
    log.Fatal(err)
  }
```
Heres what the create function looks like:
```go
import (
	"fmt"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

var createTeamsQuery = `
MERGE (team:Team { fullName: $fullName, shortName: $shortName, city: $city, tricode: $tricode })
`

func createTeamsTXWork(ft []FetchedTeam) neo4j.TransactionWork {
	return func(tx neo4j.Transaction) (interface{}, error) {
		for _, team := range ft {
			params := map[string]interface{}{
				"fullName":  team.FullName,
				"shortName": team.TeamShortName,
				"city":      team.City,
				"tricode":   team.Tricode,
			}
			result, err := tx.Run(createTeamsQuery, params)
			if err != nil {
				return nil, result.Err()
			}
			if result.Next() {
				fmt.Println(result.Record().Values...)
			}
		}
		return true, nil
	}
}

func createTeams(ft []FetchedTeam) error {
	driver, err := createDriver()
	if err != nil {
		return err
	}
	defer closeDriver(driver)
	session := createSession(driver)
	defer session.Close()
	created, err := session.WriteTransaction(createTeamsTXWork(ft))
	if err != nil {
		return err
	}
	fmt.Println("created:", created)
	return nil
}
```

A similar process was done to load the NBA players of the 2021 season.

Of course, at this point we only have two classes of nodes in our graph
database, but this interesting part here is writing the golang script to
relate players to teams. Again, there was a similiar process of creating
the relationship but the interesting bit was the Cypher query

```go
var relatePlaysForQuery = `
MATCH (p:Player { firstName: $firstName, lastName: $lastName })
MATCH (t:Team { city: $city, fullName: $fullName })
MERGE (p)-[pf:PLAYS_FOR { seasonStart: $seasonStart }]->(t)
SET pf.seasonEnd = $seasonEnd
RETURN p, t
`
```
