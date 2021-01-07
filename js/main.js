'use strict';

import { lib } from './library.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('welcum to my console');

    let plays = 0;

    const form = document.getElementById('form');
    const submit = document.getElementById('submit');
    initQuiz(plays, lib);
    form.addEventListener('submit', ev => {
        ev.preventDefault();

        if (plays < lib.length - 1) {
            console.log('submitted');
            plays++;
            initQuiz(plays, lib);
        } else {
            alert('End!')
        }
    })
});

function initQuiz(plays, lib) {
    const count = document.getElementById('count');
    const question = document.getElementById('question');
    const options = document.querySelectorAll('.quiz__input');

    count.textContent = plays + 1;
    question.textContent = lib[plays].question;
    options.forEach((element, index) => {
        const inputValue = element;
        const label = element.nextElementSibling;
        const content = lib[plays].options[index];
        label.textContent = content;
        inputValue.value = content;
    });

    //console.log(lib[plays]);
}