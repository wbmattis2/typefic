"use strict";
/*
TypeFic sample UI
For use in webpage.
Designed and developed by Benny Mattis.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var TypeFic_1 = require("./TypeFic");
var sampleBook_1 = require("./sampleBook");
var startingState = {
    currentBook: sampleBook_1.default,
    currentChapter: 'beginningChapter',
    currentPageIndex: 0,
};
var tf = new TypeFic_1.TypeFic(startingState);
var gameDiv = document.createElement('div');
var textP = document.createElement('p');
var buttonDiv = document.createElement('div');
gameDiv.appendChild(textP);
gameDiv.appendChild(buttonDiv);
document.body.appendChild(gameDiv);
var tfOut = tf.read();
var refresh = function () {
    buttonDiv.innerHTML = '';
    textP.innerText = tfOut.text;
    if (tf.gameState.gameOver)
        return;
    tfOut.choices.forEach(function (choice) {
        var currentButton = document.createElement('button');
        currentButton.innerText = choice;
        currentButton.onclick = function () {
            tfOut = tf.read(choice);
            refresh();
        };
        buttonDiv.appendChild(currentButton);
    });
};
refresh();
