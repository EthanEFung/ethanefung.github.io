---
title : "Problem Solving Over Domain Knowledge"
date : "2022-05-18T09:04:47-07:00"
cover : ""
tags : ["beginner", "imposter syndrome", "career advice"]
keywords : ["", ""]
description : ""
showFullContent : false
readingTime : false
hideComments : false
draft : false
---

### An Early Career Lesson...

Years ago when I was interviewing for the first time, I distinctly remember a coding challenge I received that asked me to create an app that allows users to enter a prefix and receive a list of words that contained the entered prefix. I was given a little over two hours to complete the challenge. Eager to impress, I tried to spin up a React app, which at the time was the latest and greatest front-end js framework at the time (this was before create-react-app was a thing), and Redux because that technology was cool and new. I started drawing up a mockup of the UI and thought:

"This is app is going to look so sick!"

Of course, nothing worked. I ran into the issues trying to sync my front-end with the server, and once I had figured out what the problem was, I ended up with a bunch of redux logic sprinkled all over the app (none of which was actually used). In the end all I had to show for was rendering a checkered board with alternating colors.

Defeated I told one of my developer friends what happened, and what he asked me I'll never forget the dialog we had after that interview.

**"Why?"**

"Well, they didn't give me enough time to impliment the reduc-"

"No, I mean why did you use Redux?"

"Because...I-"

"Why did you even use React? The front end didn't need anything other than an an input field, a submit button and a table of words after the search request."

When I first started in the industry, I thought the thing that would give me an edge over my competitors was to use the most cutting edge technologies. While there is some truth to this, the conversation I had post interview with my friend taught me that the most important questions an engineer can ever ask is not what technologies are "industry standard", or what technologies "x big company" just released, but what the problem is at hand and what is the simplest way to solve it?

Can I use React to solve the problem? Probably...Is it the simplest solution? That depends...

In my case, it clearly wasn't because the problem had little to do with the UI of the application, and everything to do with the developing a sensible UX. What makes React an industry standard is that is allows developers to scale large single page applications quickly, and I failed to see that the scope of the problem was small.

If I could travel back in time to give my younger self advice about working in this industry, I would tell him that no matter what technology he learns, all of it amounts to nothing if his domain knowledge cannot address business concerns. I now work for a startup that depends heavily on engineers to create a product for an older demographic. They don't care if the API is GraphQL or REST. They don't care if the application is built on using blockchain or artificial intelligence. What they do care about is whether or not the application helps them do their jobs well.

What matters most for engineers is their ability to problem solve. Every framework, library or coding language is an ends to this means. Don't fall into the same mistake I made by trying to impress people with your tech stack. No one is impressed. Instead focus on a business problem, search for a tool you know will work and if none come to mind then learn that new tool everyone has been talking about.

