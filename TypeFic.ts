/*
TypeFic interactive fiction framework
Designed and developed by Benny Mattis.
*/

export type startingInputs = {
  currentBook: book,
  currentChapter: string,
  currentPageIndex: number,
  currentVariables?: {}
}

export type readOutputs = {
  text: string,
  choices: string[],
}

export type state = {
  currentBook: book,
  currentChapter: string,
  currentPageIndex: number,
  currentVariables: {[key: string]: any},
  gameOver: boolean
}

export type choiceGroup = {
  [key: string]: (currentState: state) => void
}

export type chapter = {
  chapterPages: (string | ((currentState: state) => string))[],
  chapterEndingChoices: choiceGroup
}

export type book = {
  bookChapters: {[key: string]: chapter},
  bookVariables?: {[key: string]: any}
}

export class TypeFic {
  gameState: state;

  constructor(startingState: startingInputs) {
    this.gameState = {
      ...startingState, 
      gameOver: false,
      currentVariables: {}
    };
    if ('bookVariables' in this.gameState.currentBook) {
      for (const variable in this.gameState.currentBook.bookVariables) {
        this.gameState.currentVariables[variable] = this.gameState.currentBook.bookVariables[variable];
      }
    }
  }

  read(input: string = ''): {text: string, choices: string[]} {
    let output: readOutputs = {
      text: '',
      choices: ['']
    };
    if (this.gameState.gameOver) {
      output.text = 'game over.';
      return output;
    }
    const oldChapter = this.gameState.currentBook.bookChapters[this.gameState.currentChapter];
    const oldChapterChoicePageIndex: number = oldChapter.chapterPages.length - 1;
    let oldChoices: choiceGroup;
    let oldPage: string | ((currentState: state) => string);
    const changingChapter: boolean = this.gameState.currentPageIndex == oldChapterChoicePageIndex
    if (changingChapter) {
      oldPage = oldChapter.chapterPages[oldChapterChoicePageIndex];
      oldChoices = oldChapter.chapterEndingChoices;
    }
    else {
      oldPage = oldChapter.chapterPages[this.gameState.currentPageIndex];
      oldChoices = {
        'continue': (currentState: state) => {
          currentState.currentPageIndex++;
          return;
        }
      }
    }
    if (!input) {
      if (typeof oldPage == "string") {
        output.text = oldPage;
      } else if (typeof oldPage == "function") {
        output.text = oldPage(this.gameState);
      }
      output.choices = Object.keys(oldChoices);
      return output;
    }
    else if (input in oldChoices) {
      oldChoices[input](this.gameState);
      if (changingChapter) this.gameState.currentPageIndex = 0;
      return this.read();
    }
    else {
      output.text = 'invalid input: "' + String(input) + '"';
      output.choices = Object.keys(oldChoices);
      return output;
    }
  }

}