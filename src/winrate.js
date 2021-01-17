const score = document.getElementById('score');
const ach = document.getElementById('ach_container');

export class WinRate {
    constructor() {
        this.games = 1;
        this.score = 0;
        this.loss = 0;
        this.scoreTimer = 800;
        this.achs = [];
        this.points = [];
    }

    updateGame() {
        return this.games++;
    }

    updateScore() {
        score.parentElement.classList.add('score--updated');
        score.textContent = `Score: ${++this.score}`;
        setTimeout(() => {
            score.parentElement.classList.remove('score--updated');
        }, this.scoreTimer);
    }

    updateLoss() {
        this.loss++;
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
        if (this.loss === 5 && this.score === 5) {
            this.createAch('5+5', 'winner', '5 правильных и неправильных', 50);
        }
        if (this.loss === 10 && this.score === 10) {
            this.createAch('Золотая середина', 'winner', '10 правильных и неправильных', 150);
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
        if (this.games === 40) {
            this.createAch('Тебе не мало?..', 'common', 'Сыграть 40 вопросов', 100);
        }
        if (this.achs.length === 5) {
            this.createAch('Достижений мало не бывает..', 'common', 'Получить 5 достижений', 200);
        }
        if (this.achs.length === 15) {
            this.createAch('Коллекционер', 'common', 'Получить 15 достижений', 1000);
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
        if (this.loss === 10) {
            this.createAch('В следующий раз повезет!', 'loser', '10 неправильных ответов!', 0);
        }
        if (this.loss === 20) {
            this.createAch('Все пальцы проиграл', 'loser', '20 неправильных ответов!', 0);
        }
        if (this.loss === 30) {
            this.createAch('Нет слов одни неудачи..', 'loser', '30 неправильных ответов!', 0);
        }

    }

    createAch(label, type, info, points) {
        const newAch = document.createElement('div');
        newAch.textContent = label;
        newAch.classList.add('ach__item');
        newAch.setAttribute('data-achtype', type);
        newAch.setAttribute('data-achinfo', info);

        ach.appendChild(newAch);
        this.achs.push(label);
        this.points.push(points);
    }
}
