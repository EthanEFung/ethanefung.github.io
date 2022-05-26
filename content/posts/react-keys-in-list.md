---
title: "Why Your React List of Items is Not Changing"
date: "2022-05-25T08:04:02-07:00"
cover: ""
tags: ["Front End", "React", "Bugs"]
keywords: ['Warning: Each child in a list should have a unique "key" prop.', ""]
description: ""
showFullContent: false
readingTime: false
hideComments: false
draft: false
---

Over the years React has matured well in making sure the development process is predictible, especially for newer programmers, but every once in a while React developers come across a process in the framework that requires a deeper level understanding. Keys in react lists are one of those processes.

```jsx
function ExampleComponent() {
  const [list, setList] = React.useState([
    { name: 'a' }, 
    { name: 'b' }, 
    { name: 'c' }, 
  ])
  return (
    <ul>
      {list.map((item) => <li>{item.name}</li>)}
    </ul>
  )
}
```
If you were to write the component above into your React application, React would give you a warning. In React 18, the warning can be found in the browser console.

```Warning: Each child in a list should have a unique "key" prop. ...```

The React documentation on this topic is fairly robust. So, I'd recommend a thorough read through it, but let's say we're really trying to get our application out to production, and we want to get rid of the error so we make a small modification.

```jsx
function ExampleComponent() {
  const [list, setList] = React.useState([
    { name: 'a' }, 
    { name: 'b' }, 
    { name: 'c' }, 
  ])
  return (
    <ul>
      {list.map((item, i) => <li key={i}>{item.name}</li>)}
    </ul>
  )
}
```
Here, we've passed the index of the item in the array as the key of the `<li>` nodes, and this makes the warning go away. In many scenarios this could be fine, but lets talk about a scenario in which this pattern could lead to problems.

```jsx
function ExampleComponent() {
  const [list, setList] = React.useState([
    { name: "frank", color: "red" },
    { name: "owen", color: "green" },
    { name: "gehry", color: "purple" }
  ]);

  const ctrlProps = { prev: list, setList, i: 0, j: 2 };
  
  return (
    <div>
      <ul>
        {list.map((item, i) => (
          <input
            key={i}
            style={{ display: "list-item", color: item.color }}
            defaultValue={item.name}
          />
        ))}
      </ul>
      <button onClick={() => swapColors(ctrlProps)}>swap color</button>
      <button onClick={() => swapItems(ctrlProps)}>swap items</button>
    </div>
  );
}

function swapColors({ prev, setList, i, j }) {
  const list = [...prev];
  const temp = list[i].color;
  list[i].color = list[j].color;
  list[j].color = temp;
  setList(list);
}

function swapItems({ prev, setList, i, j }) {
  const list = [...prev];
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
  setList(list);
}
```
In this new example we have two state controllers `swapItems` and `swapColors` which take a state array and setter. These controllers are invoked on button clicks. Also to point out that unlike our previous example we are now rendering `<input />` nodes which have internal state not maintained by React's virtual DOM.

Looking at the state controllers, we can assume that intended effect in `swapItems` is that the ordering of the items should change while `swapColors` should just update the attributes of the items. The implication of `swapItems` is that the internal states of item 0 and 2 should change, while the internal states when using `swapColors` should not. 

Namely, if you were to run the code in a code sandbox like this:

[Example CodeSandbox](https://codesandbox.io/s/elegant-ptolemy-xj5ysd?file=/src/ExampleComponent.js)

You'd expect that the upon clicking the `swapItems` button that the input values "frank" and "gehry" should switch, but this is not the case when we use the index as the key. Why is that?

The reason why the `key` attribute exists on React elements is because it helps React determine whether the elements should be re-ordered or if only the properties of the elements should change. By passing the index of the element we are effectively telling React, "All of these elements in this list will _not_ be re-ordered in any way." Therefore, React does not change any of the internal state of the ordered items.

```
first render
...
item with key -> 0
  - color: red
  - name: frank
  - input1 
    - defaultValue: frank
    - value: frank
itemB with key -> 2
  - color: purple
  - name: gehry
  - input2 
    - defaultValue: gehry
    - value: gehry

action: 
Run the swap items controller

second render
...
item with key -> 0
  - color: purple
  - name: gehry 
  - input1 
    - defaultValue: gehry     <--- a new default value is passed but
    - value: frank            <--- input manages its own state

item with key -> 2
  - color: red
  - name: frank
  - input2 
    - defaultValue: frank     <--- a new default value is passed but
    - value: gehry            <--- input manages its own state
```
I should note that this behavior isn't unique to html elements, but any stateful React elements where the state is managed below the list. The solution, (as it is well document) is to use to pass unique identifiers as the keys
```jsx
function ExampleComponent() {
  const [list, setList] = React.useState([
    { name: "frank", color: "red" },
    { name: "owen", color: "green" },
    { name: "gehry", color: "purple" }
  ]);

  const ctrlProps = { prev: list, setList, i: 0, j: 2 };
  
  return (
    <div>
      <ul>
        {list.map((item, i) => (
          <input
            // using the name could be a weak key if the name can be mutated
            // or reordered 
            key={item.name}
            style={{ display: "list-item", color: item.color }}
            defaultValue={item.name}
          />
        ))}
      </ul>
      <button onClick={() => swapColors(ctrlProps)}>swap color</button>
      <button onClick={() => swapItems(ctrlProps)}>swap items</button>
    </div>
  );
}
```
An even better solution would be to import an npm library like `nanoid` and adding an id attribute to each of the items in the list, but use the most appropriate solution for your application.

In conclusion, it's always safe pass a unique identifier and avoid using the index as the key to the list. However, you can use the index in the use cases where:
1. The ordering of the list is guaranteed to stay the same through the lists lifetime (this includes no deletion of elements).
2. None of the items in the list contain internal state.

Though, my recommendation is to never set the index as the key since you never know whether business requirements for your component will call for the reordering of the list, or if your list items become stateful.

## More Reading
- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
- [Dan Abramov's Tweet](https://twitter.com/dan_abramov/status/1415279090446204929?lang=en)