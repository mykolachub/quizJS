import { getAnswersAndQuestions } from './questions.js';

const options = document.querySelectorAll('.quiz__input');
const count = document.getElementById('count');
const question = document.getElementById('question');

// Quiz
export class Quiz {
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
          resolve();
        }
      });
    });
  }

  nextPlay() {
    this.plays++;
  }

  initQuiz() {
    count.textContent = this.plays;
    question.textContent = this.library.question;
    options.forEach((option, index) => {
      const label = option.nextElementSibling;
      const content = this.library.options[index];
      label.textContent = content;
      option.value = content;
    });
  }

  isChecked() {
    this.checked = false; // flag gets reset
    options.forEach(option => {
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
      return true;
    } else {
      options.forEach(option => {
        if (this.library.answer === option.value) {
          option.parentElement.classList.add('quiz__answere--correct');
        }
        this.choice.parentElement.classList.add('quiz__answere--wrong');
      });
      return false;
    }
  }

  unColorizeAll() {
    setTimeout(() => {
      options.forEach(option => {
        option.parentElement.classList.remove(
          'quiz__answere--correct',
          'quiz__answere--wrong'
        );
      });
    }, this.timer);
  }
}
