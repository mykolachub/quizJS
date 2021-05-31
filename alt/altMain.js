import { lib } from './altLib.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const DOM = {
    form: document.getElementById('form'),
    options: document.querySelectorAll('.quiz__input'),
    count: document.getElementById('count'),
    question: document.getElementById('question'),
  };

  class Quiz {
    constructor(app) {
      this.plays = 0; // KEY VARIABLE: number of games
      this.done = false; // game flag
      this.choice = null; // user's choice
      this.checked = false; // falg false if user didnt choose an option
      this.library = app.library; // library of questions
      this.timer = app.timer; // time between questions
    }

    initQuiz() {
      DOM.count.textContent = this.plays + 1;
      DOM.question.textContent = this.library[this.plays].question;
      DOM.options.forEach((option, index) => {
        const label = option.nextElementSibling;
        const content = this.library[this.plays].options[index];
        label.textContent = content;
        option.value = content;
      });
    }

    updateQuiz() {
      if (this.plays === this.library.length - 1) {
        this.done = true;
        return;
      } else {
        this.nextPlay();
        this.initQuiz();
      }
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
      const isCorrect = this.library[this.plays].answer === this.choice.value;
      if (isCorrect) {
        this.choice.parentElement.classList.add('quiz__answere--correct');
      } else {
        DOM.options.forEach(option => {
          if (this.library[this.plays].answer === option.value) {
            option.parentElement.classList.add('quiz__answere--correct');
          }
          this.choice.parentElement.classList.add('quiz__answere--wrong');
        });
      }
    }

    unColorizeAll() {
      DOM.options.forEach(option => {
        option.parentElement.classList.remove(
          'quiz__answere--correct',
          'quiz__answere--wrong'
        );
      });
    }

    nextPlay() {
      return this.plays++;
    }

    resetQuiz() {
      this.plays = 0;
      this.done = false;
      this.choice = null;
      this.checked = false;
      this.initQuiz();
    }
  }

  // quiz initialization
  const quiz = new Quiz({
    library: lib,
    timer: 1000,
    elements: DOM,
  });

  // game initialization
  quiz.initQuiz();
  DOM.form.addEventListener('submit', event => {
    event.preventDefault();
    if (!quiz.done) {
      if (quiz.isChecked()) {
        quiz.colorizeChoice();
        setTimeout(() => {
          // removes all highlights
          quiz.unColorizeAll();
          quiz.updateQuiz();
        }, quiz.timer);
      } else {
        alert('Choose an option first!');
      }
    } else {
      alert('End');
      return;
    }
  });
});
