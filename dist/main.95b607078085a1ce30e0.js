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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quiz_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quiz.js */ \"./src/quiz.js\");\n/* harmony import */ var _winrate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./winrate.js */ \"./src/winrate.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  // DOM elements\n  const form = document.getElementById('form');\n  const darkMode = document.getElementById('dark_mode');\n  const html = document.getElementById('html');\n\n  // components initializations\n  const quiz = new _quiz_js__WEBPACK_IMPORTED_MODULE_0__.Quiz();\n  const rate = new _winrate_js__WEBPACK_IMPORTED_MODULE_1__.WinRate();\n\n  // game initialization\n  (async function() {\n    await quiz.nextGame();\n    quiz.initQuiz();\n  })();\n\n  form.addEventListener('submit', async event => {\n    event.preventDefault();\n\n    if (quiz.isChecked()) {\n      //quiz.colorizeChoice();\n      if (quiz.colorizeChoice()) {\n        rate.updateScore(); // true\n      } else {\n        rate.updateLoss(); // false\n      }\n      rate.updateAch();\n      rate.updateGame();\n      quiz.unColorizeAll();\n      quiz.updateQuiz();\n    } else {\n      alert('Choose an option first!');\n    }\n  });\n\n  // dark mode\n  darkMode.addEventListener('click', () => {\n    html.classList.toggle('darkmode--enabled');\n    if (html.classList.contains('darkmode--enabled')) {\n      darkMode.textContent = 'Dark Mode: On';\n    } else {\n      darkMode.textContent = 'Dark Mode: Off';\n    }\n  });\n});\n\n\n//# sourceURL=webpack://quizjs/./src/main.js?");

/***/ }),

/***/ "./src/questions.js":
/*!**************************!*\
  !*** ./src/questions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAnswersAndQuestions\": () => /* binding */ getAnswersAndQuestions\n/* harmony export */ });\nasync function getAnswersAndQuestions() {\n  let responceObj = {};\n  await axios({\n    url: 'https://wrapapi.com/use/lifipp/firstrepo/victorinaQuset2/0.0.4',\n    method: 'post',\n    data: {\n      wrapAPIKey: 'NJsbYb1dcypO3Jj3vYmUG0kkj6NyxTkD',\n    },\n  }).then(\n    res => {\n      // responceObj = res.data.data;\n      responceObj.options = res.data.data.answers;\n      responceObj.question = res.data.data.question;\n      responceObj.id = res.data.data.id;\n    },\n    err => {\n      alert('Error, parse data. Code:' + err.status);\n      responceObj = {};\n    }\n  );\n\n  await axios\n    .post(\n      'https://wrapapi.com/use/lifipp/firstrepo/chevictorinaAnswers/latest',\n      {\n        id: responceObj.id,\n        wrapAPIKey: 'NJsbYb1dcypO3Jj3vYmUG0kkj6NyxTkD',\n      }\n    )\n    .then(\n      res => {\n        const str = res.data.data.output;\n        const correctAnswer = str.slice(str.indexOf(':') + 2);\n        responceObj.answer = correctAnswer;\n      },\n      err => {\n        alert('Error parse correctAnswer. Code:' + err.status);\n        responceObj = {};\n      }\n    );\n\n  return responceObj;\n}\n\n\n//# sourceURL=webpack://quizjs/./src/questions.js?");

/***/ }),

/***/ "./src/quiz.js":
/*!*********************!*\
  !*** ./src/quiz.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Quiz\": () => /* binding */ Quiz\n/* harmony export */ });\n/* harmony import */ var _questions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./questions.js */ \"./src/questions.js\");\n\n\nconst options = document.querySelectorAll('.quiz__input');\nconst count = document.getElementById('count');\nconst question = document.getElementById('question');\n\n// Quiz\nclass Quiz {\n  constructor() {\n    this.plays = 0; // KEY VARIABLE: number of games\n    this.done = false; // game flag\n    this.choice = null; // user's choice\n    this.checked = false; // falg false if user didnt choose an option\n    this.library = null; // library of questions\n    this.timer = 1000; // time between questions\n  }\n\n  async updateQuiz() {\n    await this.nextGame();\n    this.initQuiz();\n  }\n\n  async nextGame() {\n    this.nextPlay();\n    return new Promise(resolve => {\n      (0,_questions_js__WEBPACK_IMPORTED_MODULE_0__.getAnswersAndQuestions)().then(res => {\n        if (res) {\n          this.library = { ...res };\n          resolve();\n        }\n      });\n    });\n  }\n\n  nextPlay() {\n    this.plays++;\n  }\n\n  initQuiz() {\n    count.textContent = this.plays;\n    question.textContent = this.library.question;\n    options.forEach((option, index) => {\n      const label = option.nextElementSibling;\n      const content = this.library.options[index];\n      label.textContent = content;\n      option.value = content;\n    });\n  }\n\n  isChecked() {\n    this.checked = false; // flag gets reset\n    options.forEach(option => {\n      if (option.checked) {\n        this.checked = true;\n        this.choice = option;\n        option.checked = false;\n      }\n    });\n    return this.checked;\n  }\n\n  colorizeChoice() {\n    const isCorrect = this.library.answer === this.choice.value;\n    if (isCorrect) {\n      this.choice.parentElement.classList.add('quiz__answere--correct');\n      return true;\n    } else {\n      options.forEach(option => {\n        if (this.library.answer === option.value) {\n          option.parentElement.classList.add('quiz__answere--correct');\n        }\n        this.choice.parentElement.classList.add('quiz__answere--wrong');\n      });\n      return false;\n    }\n  }\n\n  unColorizeAll() {\n    setTimeout(() => {\n      options.forEach(option => {\n        option.parentElement.classList.remove(\n          'quiz__answere--correct',\n          'quiz__answere--wrong'\n        );\n      });\n    }, this.timer);\n  }\n}\n\n\n//# sourceURL=webpack://quizjs/./src/quiz.js?");

/***/ }),

/***/ "./src/winrate.js":
/*!************************!*\
  !*** ./src/winrate.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WinRate\": () => /* binding */ WinRate\n/* harmony export */ });\nconst score = document.getElementById('score');\nconst ach = document.getElementById('ach_container');\n\nclass WinRate {\n  constructor() {\n    this.games = 1;\n    this.score = 0;\n    this.loss = 0;\n    this.scoreTimer = 800;\n    this.achs = [];\n    this.points = [];\n  }\n\n  updateGame() {\n    return this.games++;\n  }\n\n  updateScore() {\n    score.parentElement.classList.add('score--updated');\n    score.textContent = `Score: ${++this.score}`;\n    setTimeout(() => {\n      score.parentElement.classList.remove('score--updated');\n    }, this.scoreTimer);\n  }\n\n  updateLoss() {\n    this.loss++;\n  }\n\n  updateAch() {\n    // winner\n    if (this.games === 1 && this.score === 1) {\n      this.createAch(\n        'Легкий старт',\n        'winner',\n        'С первого раза ответить правильно',\n        100\n      );\n    }\n    if (this.score === this.games && this.score === 5) {\n      this.createAch(\n        'Невероятное начало!',\n        'winner',\n        '5 раз подрят ответить правильно!',\n        500\n      );\n    }\n    if (this.games === 10 && this.score === 5) {\n      this.createAch('Середнячок', 'winner', 'Половина правильных ответов', 50);\n    }\n    if (this.score === 10) {\n      this.createAch(\n        'Дядь, дай 10 копеек',\n        'winner',\n        '10 правильных ответов',\n        100\n      );\n    }\n    if (this.score === 20) {\n      this.createAch(\n        'Дядь, дай 10 копеек',\n        'winner',\n        '20 правильных ответов',\n        200\n      );\n    }\n    if (this.loss === 5 && this.score === 5) {\n      this.createAch('5+5', 'winner', '5 правильных и неправильных', 50);\n    }\n    if (this.loss === 10 && this.score === 10) {\n      this.createAch(\n        'Золотая середина',\n        'winner',\n        '10 правильных и неправильных',\n        150\n      );\n    }\n\n    // common\n    if (this.games === 5) {\n      this.createAch('Дай пять!', 'common', 'Сыграть 10 вопросов', 10);\n    }\n    if (this.games === 20) {\n      this.createAch('Настырный', 'common', 'Сыграть 20 вопросов', 50);\n    }\n    if (this.games === 30) {\n      this.createAch('Займись уже делом', 'common', 'Сыграть 30 вопросов', 100);\n    }\n    if (this.games === 40) {\n      this.createAch('Тебе не мало?..', 'common', 'Сыграть 40 вопросов', 100);\n    }\n    if (this.achs.length === 5) {\n      this.createAch(\n        'Достижений мало не бывает..',\n        'common',\n        'Получить 5 достижений',\n        200\n      );\n    }\n    if (this.achs.length === 15) {\n      this.createAch('Коллекционер', 'common', 'Получить 15 достижений', 1000);\n    }\n\n    // loser\n    if (this.games === 5 && this.score === 0) {\n      this.createAch(\n        'Неудача за неудачей',\n        'loser',\n        '5 раз подрят ответить неправильно!',\n        0\n      );\n    }\n    if (this.games === 10 && this.score === 0) {\n      this.createAch(\n        'Иди читай книги',\n        'loser',\n        '10 раз подрят ответить неправильно!',\n        -10\n      );\n    }\n    if (this.games === 15 && this.score === 0) {\n      this.createAch(\n        'Дурак стыда не знает..',\n        'loser',\n        '15 раз подрят ответить неправильно!',\n        -15\n      );\n    }\n    if (this.loss === 10) {\n      this.createAch(\n        'В следующий раз повезет!',\n        'loser',\n        '10 неправильных ответов!',\n        0\n      );\n    }\n    if (this.loss === 20) {\n      this.createAch(\n        'Все пальцы проиграл',\n        'loser',\n        '20 неправильных ответов!',\n        0\n      );\n    }\n    if (this.loss === 30) {\n      this.createAch(\n        'Нет слов одни неудачи..',\n        'loser',\n        '30 неправильных ответов!',\n        0\n      );\n    }\n  }\n\n  createAch(label, type, info, points) {\n    const newAch = document.createElement('div');\n    newAch.textContent = label;\n    newAch.classList.add('ach__item');\n    newAch.setAttribute('data-achtype', type);\n    newAch.setAttribute('data-achinfo', info);\n\n    ach.appendChild(newAch);\n    this.achs.push(label);\n    this.points.push(points);\n  }\n}\n\n\n//# sourceURL=webpack://quizjs/./src/winrate.js?");

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