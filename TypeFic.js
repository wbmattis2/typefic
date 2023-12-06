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
