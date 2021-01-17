import { Quiz } from './quiz.js';
import { WinRate } from './winrate.js';

document.addEventListener('DOMContentLoaded', () => {

  // DOM elements
  const form = document.getElementById('form');
  const darkMode = document.getElementById('dark_mode');
  const html = document.getElementById('html');

  // components initializations
  const quiz = new Quiz();
  const rate = new WinRate();

  // game initialization
  (async function() {
    await quiz.nextGame();
    quiz.initQuiz();
  }());

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (quiz.isChecked()) {
      //quiz.colorizeChoice();
      if (quiz.colorizeChoice()) {
        rate.updateScore(); // true
      } else {
        rate.updateLoss(); // false
      }
      rate.updateAch();
      rate.updateGame();
      quiz.unColorizeAll();
      quiz.updateQuiz();
    } else {
      alert('Choose an option first!');
    }
  });

  // dark mode 
  darkMode.addEventListener('click', () => {
    html.classList.toggle('darkmode--enabled');
    if (html.classList.contains('darkmode--enabled')) {
      darkMode.textContent = 'Dark Mode: On';
    } else {
      darkMode.textContent = 'Dark Mode: Off';
    }
  });
});
