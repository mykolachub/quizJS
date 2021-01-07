'use strict';

import { lib } from './library.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('welcum to my console');

    // application settings
    const app = {
        plays: 0, // number of games
        library : lib, // library of questions
        timer: 1500, // time between questions
        form: document.getElementById('form'),
        options: document.querySelectorAll('.quiz__input'),
        count: document.getElementById('count'),
        question: document.getElementById('question'),
    }

    initQuiz(app);
    app.form.addEventListener('submit', event => {
        event.preventDefault();
        const {library, options, timer} = app;

        if (app.plays < library.length) {
            //console.log('submitted');
            let isChecked = false;
            let choice;

            options.forEach(option => {
                if (option.checked) {
                    isChecked = true;
                    choice = option;
                    option.checked = false;
                }
            });

            if (isChecked) {
                if (library[app.plays].answere == choice.value) {
                    // correct
                    choice.parentElement.classList.add('quiz__answere--correct');
                } else {
                    // wrong
                    choice.parentElement.classList.add('quiz__answere--wrong');
                }
                setTimeout(() => {
                    // updates quiz
                    choice.parentElement.classList.remove('quiz__answere--correct', 'quiz__answere--wrong');
                    app.plays++;
                    initQuiz(app);
                }, timer);
                
            } else {
                alert('Choose an option first!');
            }

        } else {
            setTimeout(() => {  
                alert('End!');
            }, timer);
        }
    })
});

function initQuiz(app) {
    const {plays, count, question, options, library} = app;

    count.textContent = plays + 1;
    question.textContent = library[plays].question;
    options.forEach((option, index) => {
        const inputValue = option;
        const label = option.nextElementSibling;
        const content = library[plays].options[index];
        label.textContent = content;
        inputValue.value = content;
    });
}