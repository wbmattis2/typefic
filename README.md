# TypeFic.ts
TypeScript framework for creating interactive fiction.  

Designed and developed by Benny Mattis.

## Purpose

To simplify the process of writing text adventures for anyone with a modest proficiency in JavaScript and/or TypeScript.

## How to Use

First, write a book in accordance with the example, sampleBook. A book is an object in JavaScript or TypeScript.  

### Writing a Book for TypeFic

A book should have at least one property: `bookChapters`. Id your story will use variables, you can also include the `bookVariables` property.  

If it is used, the value of `bookVariables` should be another object mapping all variables used in the book to their default initial values. e.g. `{health: 100, exp: 0, name: 'Hero'}`.

`bookChapters` should be an object, each key of which is the name of a chapter in the book. The value of each key is another nested object, consisting of `chapterPages` and `chapterEndingChoices`.  

`chapterPages` should be an array. Each element of the array should be either a string to be read by the player or a function that returns a string. If it is the latter, the function should accept an argument of type `state` (as defined in TypeScript.ts).  

`chapterEndingChoices` is another nested object. Keys are strings to be displayed as options for the user to select. Corresponding values should be functions changing the game's state to start a new chapter. These functions should accept an argument of type `state` (as defined in TypeScript.ts), change the state values, and return no values (i.e., they should return `void`).


### Reading your Book with TypeFic  

As with any TypeScript project, files must be transpiled into JavaScript for use in Node or the browser; browser programs spanning multiple files should also be bundled into a single script with something like Browserify.

Examples on how to read your book are included in node_ui and web_ui files.
Create a new TypeFic object modeled after the type `startingInputs` (as defined in TypeScript.ts).  

Then, you can view the current state of your TypeFic object by calling its `gameState` property. 

The TypeFic object's `read()` method returns an object of type `readOutputs` (as defined in TypeScript.ts). This object includes two properties: `text`, i.e. the text (type `string`) of the current page, and `choices`, i.e. an array of `string`s.

By calling `read()` with an argument of type `string` from the current available `choices`, you can advance further in the story. When it is called with an argument, the object returned by `read()` will contain the new current text and available choices.
 

## Special Thanks  

[Browserify](https://browserify.org/) can be used to bundle transpiled scripts into a web page interface. Special thanks to Advanced Web Machinery for showing how to use Browserify: [https://advancedweb.hu/getting-started-with-browserify/]  

## License  

The MIT License:

Copyright 2023 Benny Mattis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


