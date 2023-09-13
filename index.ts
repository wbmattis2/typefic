/*
TypeFic sample UI
For use in Node runtime environment.
Designed and developed by Benny Mattis.
*/


import {TypeFic, startingInputs, readOutputs} from './TypeFic';
import sampleBook from './sampleBook';
const prompt = require('prompt-sync')({sigint: true});
const startingState: startingInputs = {
  currentBook: sampleBook,
  currentChapter: 'beginningChapter',
  currentPageIndex: 0,
};
const tf = new TypeFic(startingState);
let display: readOutputs = tf.read();
do {
  console.log(('\n').repeat(20) + display.text + ('\n').repeat(3));
  let noChoices = (display.choices.length == 1) && (display.choices[0] == 'continue');
  console.log( noChoices? 'Press enter to continue.' : 'Choices:\n' + display.choices + '\n');
  let input = prompt(noChoices ? '' : '>>>>>');
  if (noChoices) input = 'continue';
  display = tf.read(input);
} while (!tf.gameState.gameOver);
