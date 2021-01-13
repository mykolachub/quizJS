import { getAnswersAndQuestions } from './questions.js';

document.addEventListener('DOMContentLoaded', () => {

  // DOM elements
  const DOM = {
    form: document.getElementById('form'),
    options: document.querySelectorAll('.quiz__input'),
    count: document.getElementById('count'),
    question: document.getElementById('question'),
    score: document.getElementById('score'),
    darkMode: document.getElementById('dark_mode'),
    html: document.getElementById('html'),
    ach: document.getElementById('ach_container'),
  };

  // Quiz
  class Quiz {
    constructor() {
      this.plays = 0; // KEY VARIABLE: number of games
      this.done = false; // game flag
      this.choice = null; // user's choice
      this.checked = false; // falg false if user didnt choose an option
      this.library = null; // library of questions
      this.timer = 1000; // time between questions
    }

    async updateQuiz() {
      await this.nextGame();
      this.initQuiz();
    }

    async nextGame() {
      this.nextPlay();
      return new Promise(resolve => {
        getAnswersAndQuestions().then(res => {
          if (res) {
            this.library = { ...res };
            console.log(res.answer);
            resolve();
          }
        });
      });
    }

    nextPlay() {
      this.plays++;
      rate.updateGame(this.plays);
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
      const isCorrect = this.library.answer === this.choice.value;
      if (isCorrect) {
        this.choice.parentElement.classList.add('quiz__answere--correct');
        rate.updateScore();
      } else {
        DOM.options.forEach(option => {
          if (this.library.answer === option.value) {
            option.parentElement.classList.add('quiz__answere--correct');
          }
          this.choice.parentElement.classList.add('quiz__answere--wrong');
        });
      }
    }

    unColorizeAll() {
      setTimeout(() => {
        DOM.options.forEach(option => {
          option.parentElement.classList
            .remove('quiz__answere--correct', 'quiz__answere--wrong');
        });
      }, this.timer);
    }
  }

  // winRate
  class WinRate {
    constructor() {
      this.games = 1;
      this.score = 0;
      this.scoreTimer = 800;
      this.achs = [];
      this.points = [];
    }

    updateGame(number) {
      this.games = number;
    }

    updateAch() {
      // winner
      if (this.games === 1 && this.score === 1) {
        this.createAch('Легкий старт', 'winner', 'С первого раза ответить правильно', 100);
      }
      if (this.score === this.games && this.score === 5) {
        this.createAch('Невероятное начало!', 'winner', '5 раз подрят ответить правильно!', 500);
      }
      if (this.games === 10 && this.score === 5) {
        this.createAch('Середнячок', 'winner', 'Половина правильных ответов', 50);
      }
      if (this.score === 10) {
        this.createAch('Дядь, дай 10 копеек', 'winner', '10 правильных ответов', 100);
      }
      if (this.score === 20) {
        this.createAch('Дядь, дай 10 копеек', 'winner', '20 правильных ответов', 200);
      }
      if (this.games === 20 && this.score === 10) {
        this.createAch('Золотая середина', 'winner', 'Половина правильных ответов', 200);
      }

      // common
      if (this.games === 5) {
        this.createAch('Дай пять!', 'common', 'Сыграть 10 вопросов', 10);
      }
      if (this.games === 20) {
        this.createAch('Настырный', 'common', 'Сыграть 20 вопросов', 50);
      }
      if (this.games === 30) {
        this.createAch('Займись уже делом', 'common', 'Сыграть 30 вопросов', 100);
      }
      if (this.achs.length === 5) {
        this.createAch('Достижений мало не бывает..', 'common', 'Получить 5 достижений', 100);
      }

      // loser
      if (this.games === 5 && this.score === 0) {
        this.createAch('Неудача за неудачей', 'loser', '5 раз подрят ответить неправильно!', 0);
      }
      if (this.games === 10 && this.score === 0) {
        this.createAch('Иди читай книги', 'loser', '10 раз подрят ответить неправильно!', -10);
      }
      if (this.games === 15 && this.score === 0) {
        this.createAch('Дурак стыда не знает..', 'loser', '15 раз подрят ответить неправильно!', -15);
      }

    }

    createAch(label, type, info, points) {
      const newAch = document.createElement('div');
      newAch.textContent = label;
      newAch.classList.add('ach__item');
      newAch.setAttribute('data-achtype', type);
      newAch.setAttribute('data-achinfo', info);

      DOM.ach.appendChild(newAch);
      this.achs.push(label);
      this.points.push(points);
    }

    updateScore() {
      DOM.score.parentElement.classList.add('score--updated');
      DOM.score.textContent = `Score: ${++this.score}`;
      setTimeout(() => {
        DOM.score.parentElement.classList.remove('score--updated');
      }, this.scoreTimer);
    }

  }

  // quiz initialization
  const quiz = new Quiz();
  const rate = new WinRate();

  // game initialization
  (async function() {
    await quiz.nextGame();
    quiz.initQuiz();
  }());

  DOM.form.addEventListener('submit', async event => {
    event.preventDefault();

    if (quiz.isChecked()) {
      quiz.colorizeChoice();
      rate.updateAch();
      quiz.unColorizeAll();
      quiz.updateQuiz();
      console.log(rate.achs);
    } else {
      alert('Choose an option first!');
    }
  });

  DOM.darkMode.addEventListener('click', () => {
    DOM.html.classList.toggle('darkmode--enabled');
    if (DOM.html.classList.contains('darkmode--enabled')) {
      DOM.darkMode.textContent = 'Dark Mode: On';
    } else {
      DOM.darkMode.textContent = 'Dark Mode: Off';
    }
  });
});
