/*
TypeFic sample UI
For use in webpage.
Designed and developed by Benny Mattis.
*/


import {TypeFic, startingInputs, readOutputs} from './TypeFic';
import sampleBook from './sampleBook';
const startingState: startingInputs = {
  currentBook: sampleBook,
  currentChapter: 'beginningChapter',
  currentPageIndex: 0,
};
const tf = new TypeFic(startingState);
const gameDiv = document.createElement('div');
const textP = document.createElement('p');
const buttonDiv = document.createElement('div');
gameDiv.appendChild(textP);
gameDiv.appendChild(buttonDiv);
document.body.appendChild(gameDiv);
let tfOut: readOutputs = tf.read();
const refresh = () => {
  buttonDiv.innerHTML = '';
  textP.innerText = tfOut.text;
  if (tf.gameState.gameOver) return;
  tfOut.choices.forEach((choice) => {
    let currentButton = document.createElement('button');
    currentButton.innerText = choice;
    currentButton.onclick = () => {
      tfOut = tf.read(choice);
      refresh();
    };
    buttonDiv.appendChild(currentButton);
  });
}
refresh();