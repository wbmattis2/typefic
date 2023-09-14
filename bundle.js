(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/*
TypeFic interactive fiction framework
Designed and developed by Benny Mattis.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeFic = void 0;
var TypeFic = /** @class */ (function () {
    function TypeFic(startingState) {
        this.gameState = __assign(__assign({}, startingState), { gameOver: false, currentVariables: {} });
        if ('bookVariables' in Object.keys(this.gameState.currentBook)) {
            for (var variable in this.gameState.currentBook.bookVariables) {
                this.gameState.currentVariables[variable] = this.gameState.currentBook.bookVariables[variable];
            }
        }
    }
    TypeFic.prototype.read = function (input) {
        if (input === void 0) { input = ''; }
        var output = {
            text: '',
            choices: ['']
        };
        if (this.gameState.gameOver) {
            output.text = 'game over.';
            return output;
        }
        var oldChapter = this.gameState.currentBook.bookChapters[this.gameState.currentChapter];
        var oldChapterChoicePageIndex = oldChapter.chapterPages.length;
        var oldChoices;
        var oldPage;
        var changingChapter = this.gameState.currentPageIndex == oldChapterChoicePageIndex;
        if (changingChapter) {
            oldPage = oldChapter.chapterPages[oldChapterChoicePageIndex - 1];
            oldChoices = oldChapter.chapterEndingChoices;
        }
        else {
            oldPage = oldChapter.chapterPages[this.gameState.currentPageIndex];
            oldChoices = {
                'continue': function (currentState) {
                    currentState.currentPageIndex++;
                    return;
                }
            };
        }
        if (!input) {
            if (typeof oldPage == "string") {
                output.text = oldPage;
            }
            else if (typeof oldPage == "function") {
                output.text = oldPage(this.gameState);
            }
            output.choices = Object.keys(oldChoices);
            return output;
        }
        else if (input in oldChoices) {
            oldChoices[input](this.gameState);
            if (changingChapter)
                this.gameState.currentPageIndex = 0;
            return this.read();
        }
        else {
            output.text = 'invalid input: "' + String(input) + '"';
            output.choices = Object.keys(oldChoices);
            return output;
        }
    };
    return TypeFic;
}());
exports.TypeFic = TypeFic;

},{}],2:[function(require,module,exports){
"use strict";
/*
TypeFic sample book
Designed and developed by Benny Mattis.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var sampleBook = {
    bookChapters: {
        'beginningChapter': {
            chapterPages: [
                'This is the beginning. ',
                'It is where the character exposition takes place. ',
                'However,\n',
                'This story doesn\'t have any characters.'
            ],
            chapterEndingChoices: {
                'repeat beginning': function (currentState) {
                    return;
                },
                'go to middle': function (currentState) {
                    currentState.currentChapter = 'middleChapter';
                    return;
                },
                'go to ending chapter': function (currentState) {
                    currentState.currentChapter = 'endChapter';
                    return;
                }
            }
        },
        'middleChapter': {
            chapterPages: [
                'This is the middle. ',
                'A lot of action usually happens here. ',
                function (currentState) { return 'Maybe even a turning point at page ' + currentState.currentPageIndex + '.'; },
                'However,\n',
                'This story doesn\'t have a plot!'
            ],
            chapterEndingChoices: {
                'return to beginning': function (currentState) {
                    currentState.currentChapter = 'beginningChapter';
                    return;
                },
                'repeat middle': function (currentState) {
                    return;
                },
                'go to ending chapter': function (currentState) {
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
                'return to beginning': function (currentState) {
                    currentState.currentChapter = 'beginningChapter';
                    return;
                },
                'return to middle': function (currentState) {
                    currentState.currentChapter = 'middleChapter';
                    return;
                },
                'repeat the ending chapter': function (currentState) {
                    return;
                },
                'end game': function (currentState) {
                    currentState.gameOver = true;
                    return;
                }
            }
        }
    }
};
exports.default = sampleBook;

},{}],3:[function(require,module,exports){
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

},{"./TypeFic":1,"./sampleBook":2}]},{},[3]);
