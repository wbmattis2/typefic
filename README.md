# typefic
TypeScript framework for creating interactive fiction.

## Purpose

To simplify the process of writing text adventures for anyone who has a basic proficiency in JavaScript and/or TypeScript.

## How to Use

Run in Node.

Press enter to progress through the story. Choose a path by typing in your choice (case-sensitive).

See the sample book below for a simple example.

A book is a JavaScript object with two properties: bookChapters, and bookVariables. Include all variables needed for interactivity in your book as keys in bookVariables.

bookChapters is an object, each key of which is the name of a chapter in the book. The value of each key is another nested object, consisting of chapterPages (text to be read by the player stored as an array of strings or functions returning state-dependent strings) and chapterEndingChoices. 

chapterEndingChoices is another nested object. Keys are strings to be displayed as options for the user to select. Corresponding values are functions changing the game's state in preparation for the next iteration of the game loop.
