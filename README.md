# TypeFic.ts
TypeScript framework for creating interactive fiction.

## Purpose

To simplify the process of writing text adventures for anyone with a modest proficiency in JavaScript and/or TypeScript.

## How to Use

First, write a book in accordance with the example, sampleBook. A book is an object in JavaScript or TypeScript.  

### Writing a Book for TypeFic

A book should have at least one property: bookChapters. Id your story will use variables, you can also include the bookVariables property.  

If it is used, the value of bookVariables should be another object mapping all variables used in the book to their default initial values. e.g. `{health: 100, exp: 0, name: 'Hero'}`.

bookChapters should be an object, each key of which is the name of a chapter in the book. The value of each key is another nested object, consisting of chapterPages and chapterEndingChoices.  

chapterPages should be an array. Each element of the array should be either a string to be read by the player or a function that returns a string. If it is the latter, the function should accept an argument of type `state` (as defined in TypeScript.ts).  

chapterEndingChoices is another nested object. Keys are strings to be displayed as options for the user to select. Corresponding values should be functions changing the game's state to start a new chapter. These functions should accept an argument of type `state` (as defined in TypeScript.ts), change the state values, and return no values (i.e., they should return `void`).


### Reading your Book with TypeFic  

Examples on how to read your book are included in node_ui and web_ui files.  

Create a new TypeFic object of type `startingInputs` (as defined in TypeScript.ts).  

Then, you can view the current state of your TypeFic object by calling its `gameState` property, view the current page and the current set of valid responses by calling its `read()` method without arguments, or advance to the next page by calling `read()` with one of the current valid responses in order to advance further in the story.

## Special Thanks  

Browserify was used to bundle the web ui script into bundle.js (included index.html). Special thanks to Advanced Web Machinery for showing me how to do this: [https://advancedweb.hu/getting-started-with-browserify/]
