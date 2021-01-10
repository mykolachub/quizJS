'use strict';

import { getAnswersAndQuestions } from './questions.js';

document.addEventListener('DOMContentLoaded', () => {

    class Quiz {
        constructor() {
            this.plays = 0; // KEY VARIABLE: number of games
            this.done = false; // game flag
            this.choice = null; // user's choice
            this.checked = false; // falg false if user didnt choose an option
            this.library = null; // library of questions    
            this.timer = 1000; // time between questions
        }

        async nextGame() {
            this.nextPlay();
            return new Promise((resolve, reject) => {
                getAnswersAndQuestions().then((res) => {
                    this.library = { ...res };
                    resolve();
                });
            });
        }

        nextPlay() {
            return this.plays++;
        }
        
        initQuiz() {
            DOM.count.textContent = this.plays;
            DOM.question.textContent = this.library.question;
            DOM.options.forEach((option, index) => {
                const label = option.nextElementSibling;
                const content = this.library.options[index];
                label.textContent = content;
                option.value = content;
            });
        }

        async updateQuiz() {
            // if (this.plays == this.library.length - 1) {
            //     this.done = true;
            //     return;
            // } else {
            //     this.nextPlay();
            //     this.initQuiz();
            // }
            await quiz.nextGame();
            quiz.initQuiz();
        }

        isChecked() {
            this.checked = false; // flag gets reset
            DOM.options.forEach(option => {
                if (option.checked) {
                    this.checked = true;
                    this.choice = option;
                    option.checked = false;
                }
            });
            return this.checked;
        }
        
        colorizeChoice() {
            const isCorrect = this.library.answer == this.choice.value;
            if (isCorrect) {
                this.choice.parentElement.classList.add('quiz__answere--correct');
            } else {
                DOM.options.forEach(option => {
                    if (this.library.answer == option.value) {
                        option.parentElement.classList.add('quiz__answere--correct');
                    }
                    this.choice.parentElement.classList.add('quiz__answere--wrong');
                });
            }
        }

        unColorizeAll() {
            setTimeout(() => {
                DOM.options.forEach(option => {
                    option.parentElement.classList.remove('quiz__answere--correct', 'quiz__answere--wrong');
                });
            }, quiz.timer);
        }

        // resetQuiz() {
        //     this.plays = 0;
        //     this.done = false;
        //     this.choice = null;
        //     this.checked = false;
        //     this.initQuiz();
        // }
    }

    // DOM elements
    const DOM = {
        form: document.getElementById('form'),
        options: document.querySelectorAll('.quiz__input'),
        count: document.getElementById('count'),
        question: document.getElementById('question'),
    }

    // quiz initialization
    const quiz = new Quiz();

    // game initialization
    (async function () {
        await quiz.nextGame();
        quiz.initQuiz();
    }());

    DOM.form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (quiz.isChecked()) {
            quiz.colorizeChoice();
            quiz.unColorizeAll();
            quiz.updateQuiz();
        } else {
            alert('Choose an option first!');
        }
    });
});