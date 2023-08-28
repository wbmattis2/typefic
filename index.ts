/*
TypeScript Text Adventure
A simple framework for writing interactive fiction.
Written by Benny Mattis with TypeScript.

Press enter to progress through the story. Choose a path by typing in your choice (case-sensitive).

See the sample book below for a simple example.

A book is a JavaScript object with two properties: bookChapters, and bookVariables. Include all variables needed for interactivity in your book as keys in bookVariables.

bookChapters is an object, each key of which is the name of a chapter in the book. The value of each key is another nested object, consisting of chapterPages (text to be read by the player stored as an array of strings or functions returning state-dependent strings) and chapterEndingChoices. 

chapterEndingChoices is another nested object. Keys are strings to be displayed as options for the user to select. Corresponding values are functions changing the game's state in preparation for the next iteration of the game loop.
*/

const prompt = require('prompt-sync')({sigint: true});

type state = {
  currentBook: book,
  currentChapter: string,
  currentPageIndex: number,
  gameOver: boolean
}

type choiceGroup = {
  [key: string]: (currentState: state) => void
}

type chapter = {
  chapterPages: (string | ((currentState: state) => string))[],
  chapterEndingChoices: choiceGroup
}

type book = {
  bookChapters: {[key: string]: chapter},
  bookVariables?: {[key: string]: any}
}

const readChapter = function(currentState: state): void {
  currentState.currentPageIndex = 0;
  const chapterToRead = currentState.currentBook.bookChapters[currentState.currentChapter];
  const endChapterIndex: number = chapterToRead.chapterPages.length;
  const choices: choiceGroup = chapterToRead.chapterEndingChoices;
  console.log('\n');
  for (let i = 0; i < endChapterIndex; i++) {
    const currentPage = chapterToRead.chapterPages[i];
    if (typeof currentPage == "string") {
      console.log(chapterToRead.chapterPages[i]);
    } else {
      console.log(chapterToRead.chapterPages[i]());
    }
    prompt();
  }
  console.log('*****\n\nYou have reached the end of the chapter. Type your choice to proceed in the story:\n\n');
  for (const choice in choices) {
    console.log(choice + '\n');
  }
  let userChoice: string = (prompt('>>>>>') || "");
  do {
    if (userChoice in choices) {
      choices[userChoice](currentState);
    } else {
      console.log('Invalid choice. Enter one of the choices listed:\n');
      for (const choice in choices) {
        console.log(choice + '\n');
      }
      userChoice = prompt('>>>>>') || "";
    }
  } while (!(userChoice in choices));
}

const playGame = function(currentState: state): void {
  while (!currentState.gameOver) {
    readChapter(currentState);
  }
  console.log('**\n***\nGAME OVER\n***\n**\n');
}

import sampleBook from './sampleBook';

let gameState: state = {
  currentBook: sampleBook,
  currentChapter: 'beginningChapter',
  currentPageIndex: 0,
  gameOver: false
};

playGame(gameState);