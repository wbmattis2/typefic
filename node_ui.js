"use strict";
/*
TypeFic sample UI
For use in Node runtime environment.
Designed and developed by Benny Mattis.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var TypeFic_1 = require("./TypeFic");
var sampleBook_1 = require("./sampleBook");
var prompt = require('prompt-sync')({ sigint: true });
var startingState = {
    currentBook: sampleBook_1.default,
    currentChapter: 'beginningChapter',
    currentPageIndex: 0,
};
var tf = new TypeFic_1.TypeFic(startingState);
var display = tf.read();
do {
    console.log(('\n').repeat(20) + display.text + ('\n').repeat(3));
    var noChoices = (display.choices.length == 1) && (display.choices[0] == 'continue');
    console.log(noChoices ? 'Press enter to continue.' : 'Choices:\n' + display.choices + '\n');
    var input = prompt(noChoices ? '' : '>>>>>');
    if (noChoices)
        input = 'continue';
    display = tf.read(input);
} while (!tf.gameState.gameOver);
