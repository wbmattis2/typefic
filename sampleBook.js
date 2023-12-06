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
