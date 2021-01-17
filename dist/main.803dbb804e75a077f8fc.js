/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quiz_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quiz.js */ \"./src/quiz.js\");\n/* harmony import */ var _winrate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./winrate.js */ \"./src/winrate.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  // DOM elements\n  const form = document.getElementById('form');\n  const darkMode = document.getElementById('dark_mode');\n  const html = document.getElementById('html');\n\n  // components initializations\n  const quiz = new _quiz_js__WEBPACK_IMPORTED_MODULE_0__.Quiz();\n  const rate = new _winrate_js__WEBPACK_IMPORTED_MODULE_1__.WinRate();\n\n  // game initialization\n  (async function() {\n    await quiz.nextGame();\n    quiz.initQuiz();\n  }());\n\n  form.addEventListener('submit', async event => {\n    event.preventDefault();\n\n    if (quiz.isChecked()) {\n      //quiz.colorizeChoice();\n      if (quiz.colorizeChoice()) {\n        rate.updateScore(); // true\n      } else {\n        rate.updateLoss(); // false\n      }\n      rate.updateAch();\n      rate.updateGame();\n      quiz.unColorizeAll();\n      quiz.updateQuiz();\n    } else {\n      alert('Choose an option first!');\n    }\n  });\n\n  // dark mode \n  darkMode.addEventListener('click', () => {\n    html.classList.toggle('darkmode--enabled');\n    if (html.classList.contains('darkmode--enabled')) {\n      darkMode.textContent = 'Dark Mode: On';\n    } else {\n      darkMode.textContent = 'Dark Mode: Off';\n    }\n  });\n});\n\n\n//# sourceURL=webpack://quizjs/./src/main.js?");

/***/ }),

/***/ "./src/questions.js":
/*!**************************!*\
  !*** ./src/questions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAnswersAndQuestions\": () => /* binding */ getAnswersAndQuestions\n/* harmony export */ });\nasync function getAnswersAndQuestions() {\n  let responceObj = {};\n  await axios({\n    url: 'https://wrapapi.com/use/lifipp/firstrepo/victorinaQuset2/0.0.4',\n    method: 'post',\n    data: {\n      'wrapAPIKey': 'NJsbYb1dcypO3Jj3vYmUG0kkj6NyxTkD'\n    }\n  }).then(\n    res => {\n      // responceObj = res.data.data;\n      responceObj.options = res.data.data.answers;\n      responceObj.question = res.data.data.question;\n      responceObj.id = res.data.data.id;\n    },\n    err => {\n      alert('Error, parse data. Code:' + err.status);\n      responceObj = {};\n    }\n  );\n\n  await axios.post('https://wrapapi.com/use/lifipp/firstrepo/chevictorinaAnswers/latest', {\n    'id': responceObj.id,\n    'wrapAPIKey': 'NJsbYb1dcypO3Jj3vYmUG0kkj6NyxTkD'\n  }).then(\n    res => {\n      const str = res.data.data.output;\n      const correctAnswer = (str.slice(str.indexOf(':') + 2));\n      responceObj.answer = correctAnswer;\n    },\n    err => {\n      alert('Error parse correctAnswer. Code:' + err.status);\n      responceObj = {};\n    }\n  );\n\n  return responceObj;\n}\n\n\n//# sourceURL=webpack://quizjs/./src/questions.js?");

/***/ }),

/***/ "./src/quiz.js":
/*!*********************!*\
  !*** ./src/quiz.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Quiz\": () => /* binding */ Quiz\n/* harmony export */ });\n/* harmony import */ var _questions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./questions.js */ \"./src/questions.js\");\n\r\n\r\nconst options = document.querySelectorAll('.quiz__input');\r\nconst count = document.getElementById('count');\r\nconst question = document.getElementById('question');\r\n\r\n// Quiz\r\nclass Quiz {\r\n    constructor() {\r\n        this.plays = 0; // KEY VARIABLE: number of games\r\n        this.done = false; // game flag\r\n        this.choice = null; // user's choice\r\n        this.checked = false; // falg false if user didnt choose an option\r\n        this.library = null; // library of questions\r\n        this.timer = 1000; // time between questions\r\n    }\r\n\r\n    async updateQuiz() {\r\n        await this.nextGame();\r\n        this.initQuiz();\r\n    }\r\n\r\n    async nextGame() {\r\n        this.nextPlay();\r\n        return new Promise(resolve => {\r\n            (0,_questions_js__WEBPACK_IMPORTED_MODULE_0__.getAnswersAndQuestions)().then(res => {\r\n                if (res) {\r\n                    this.library = {...res};\r\n                    resolve();\r\n                }\r\n            });\r\n        });\r\n    }\r\n\r\n    nextPlay() {\r\n        this.plays++;\r\n    }\r\n\r\n    initQuiz() {\r\n        count.textContent = this.plays;\r\n        question.textContent = this.library.question;\r\n        options.forEach((option, index) => {\r\n            const label = option.nextElementSibling;\r\n            const content = this.library.options[index];\r\n            label.textContent = content;\r\n            option.value = content;\r\n        });\r\n    }\r\n\r\n    isChecked() {\r\n        this.checked = false; // flag gets reset\r\n        options.forEach(option => {\r\n            if (option.checked) {\r\n                this.checked = true;\r\n                this.choice = option;\r\n                option.checked = false;\r\n            }\r\n        });\r\n        return this.checked;\r\n    }\r\n\r\n    colorizeChoice() {\r\n        const isCorrect = this.library.answer === this.choice.value;\r\n        if (isCorrect) {\r\n            this.choice.parentElement.classList.add('quiz__answere--correct');\r\n            return true;\r\n        } else {\r\n            options.forEach(option => {\r\n                if (this.library.answer === option.value) {\r\n                    option.parentElement.classList.add('quiz__answere--correct');\r\n                }\r\n                this.choice.parentElement.classList.add('quiz__answere--wrong');\r\n            });\r\n            return false;\r\n        }\r\n    }\r\n\r\n    unColorizeAll() {\r\n        setTimeout(() => {\r\n            options.forEach(option => {\r\n                option.parentElement.classList\r\n                    .remove('quiz__answere--correct', 'quiz__answere--wrong');\r\n            });\r\n        }, this.timer);\r\n    }\r\n}\n\n//# sourceURL=webpack://quizjs/./src/quiz.js?");

/***/ }),

/***/ "./src/winrate.js":
/*!************************!*\
  !*** ./src/winrate.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WinRate\": () => /* binding */ WinRate\n/* harmony export */ });\nconst score = document.getElementById('score');\r\nconst ach = document.getElementById('ach_container');\r\n\r\nclass WinRate {\r\n    constructor() {\r\n        this.games = 1;\r\n        this.score = 0;\r\n        this.loss = 0;\r\n        this.scoreTimer = 800;\r\n        this.achs = [];\r\n        this.points = [];\r\n    }\r\n\r\n    updateGame() {\r\n        return this.games++;\r\n    }\r\n\r\n    updateScore() {\r\n        score.parentElement.classList.add('score--updated');\r\n        score.textContent = `Score: ${++this.score}`;\r\n        setTimeout(() => {\r\n            score.parentElement.classList.remove('score--updated');\r\n        }, this.scoreTimer);\r\n    }\r\n\r\n    updateLoss() {\r\n        this.loss++;\r\n    }\r\n\r\n    updateAch() {\r\n        // winner\r\n        if (this.games === 1 && this.score === 1) {\r\n            this.createAch('Легкий старт', 'winner', 'С первого раза ответить правильно', 100);\r\n        }\r\n        if (this.score === this.games && this.score === 5) {\r\n            this.createAch('Невероятное начало!', 'winner', '5 раз подрят ответить правильно!', 500);\r\n        }\r\n        if (this.games === 10 && this.score === 5) {\r\n            this.createAch('Середнячок', 'winner', 'Половина правильных ответов', 50);\r\n        }\r\n        if (this.score === 10) {\r\n            this.createAch('Дядь, дай 10 копеек', 'winner', '10 правильных ответов', 100);\r\n        }\r\n        if (this.score === 20) {\r\n            this.createAch('Дядь, дай 10 копеек', 'winner', '20 правильных ответов', 200);\r\n        }\r\n        if (this.loss === 5 && this.score === 5) {\r\n            this.createAch('5+5', 'winner', '5 правильных и неправильных', 50);\r\n        }\r\n        if (this.loss === 10 && this.score === 10) {\r\n            this.createAch('Золотая середина', 'winner', '10 правильных и неправильных', 150);\r\n        }\r\n\r\n        // common\r\n        if (this.games === 5) {\r\n            this.createAch('Дай пять!', 'common', 'Сыграть 10 вопросов', 10);\r\n        }\r\n        if (this.games === 20) {\r\n            this.createAch('Настырный', 'common', 'Сыграть 20 вопросов', 50);\r\n        }\r\n        if (this.games === 30) {\r\n            this.createAch('Займись уже делом', 'common', 'Сыграть 30 вопросов', 100);\r\n        }\r\n        if (this.games === 40) {\r\n            this.createAch('Тебе не мало?..', 'common', 'Сыграть 40 вопросов', 100);\r\n        }\r\n        if (this.achs.length === 5) {\r\n            this.createAch('Достижений мало не бывает..', 'common', 'Получить 5 достижений', 200);\r\n        }\r\n        if (this.achs.length === 15) {\r\n            this.createAch('Коллекционер', 'common', 'Получить 15 достижений', 1000);\r\n        }\r\n\r\n        // loser\r\n        if (this.games === 5 && this.score === 0) {\r\n            this.createAch('Неудача за неудачей', 'loser', '5 раз подрят ответить неправильно!', 0);\r\n        }\r\n        if (this.games === 10 && this.score === 0) {\r\n            this.createAch('Иди читай книги', 'loser', '10 раз подрят ответить неправильно!', -10);\r\n        }\r\n        if (this.games === 15 && this.score === 0) {\r\n            this.createAch('Дурак стыда не знает..', 'loser', '15 раз подрят ответить неправильно!', -15);\r\n        }\r\n        if (this.loss === 10) {\r\n            this.createAch('В следующий раз повезет!', 'loser', '10 неправильных ответов!', 0);\r\n        }\r\n        if (this.loss === 20) {\r\n            this.createAch('Все пальцы проиграл', 'loser', '20 неправильных ответов!', 0);\r\n        }\r\n        if (this.loss === 30) {\r\n            this.createAch('Нет слов одни неудачи..', 'loser', '30 неправильных ответов!', 0);\r\n        }\r\n\r\n    }\r\n\r\n    createAch(label, type, info, points) {\r\n        const newAch = document.createElement('div');\r\n        newAch.textContent = label;\r\n        newAch.classList.add('ach__item');\r\n        newAch.setAttribute('data-achtype', type);\r\n        newAch.setAttribute('data-achinfo', info);\r\n\r\n        ach.appendChild(newAch);\r\n        this.achs.push(label);\r\n        this.points.push(points);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://quizjs/./src/winrate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;