/*
TypeFic sample book
Designed and developed by Benny Mattis.
*/

import {book, state} from './TypeFic';

const sampleBook: book = {
  bookChapters: {
    'beginningChapter': {
      chapterPages: [
        'This is the beginning. ',
        'It is where the character exposition takes place. ',
        'However,\n',
        'This story doesn\'t have any characters.'
      ],
      chapterEndingChoices: { 
        'repeat beginning': 
          (currentState: state) => {
            return;
          },
        'go to middle': 
          (currentState: state) => {
            currentState.currentChapter = 'middleChapter';
            return;
          },
        'go to ending chapter': 
          (currentState: state) => {
            currentState.currentChapter = 'endChapter';
            return;
          }
      }
    },
    'middleChapter': {
      chapterPages: [
        'This is the middle. ',
        'A lot of action usually happens here. ',
        (currentState: state) => {return 'Maybe even a turning point at page ' + currentState.currentPageIndex + '.';},
        'However,\n',
        'This story doesn\'t have a plot!'
      ],
      chapterEndingChoices: { 
        'return to beginning': 
          (currentState: state) => {
            currentState.currentChapter = 'beginningChapter';
            return;
          },
        'repeat middle': 
          (currentState: state) => {
            return;
          },
        'go to ending chapter': 
          (currentState: state) => {
            currentState.currentChapter = 'endChapter';
            return;
          }
      }
    },
    'endChapter': {
      chapterPages: [
        'This is the end. ',
        'In this part of the story, all the hanging threads are tied up for a satisfactory, cathartic overall experience. ',
        'Unfortunately, this story does not have any such emotional release.'
      ],
      chapterEndingChoices: { 
        'return to beginning': 
          (currentState: state) => {
            currentState.currentChapter = 'beginningChapter';
            return;
          },
        'return to middle': 
          (currentState: state) => {
            currentState.currentChapter = 'middleChapter';
            return;
          },
        'repeat the ending chapter': 
          (currentState: state) => {
            return;
          },
        'end game':
          (currentState: state) => {
            currentState.gameOver = true;
            return;
          }
      }
    }
  }
};
export default sampleBook;