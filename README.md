# Quiz WebPage
Simple rules: The correct answers will be highlighted green while the wrong answers will be highlighted red.

## How Library of Questions is Designed
By the time this article was written, I have no experience in working with server. Thus I storage library of questions and answers on GitHub. If you would like to add **your own** quiz, you can create a pull request. Here is how library.js is designed:
```js
export const lib = [{
        question: '', // <string>, quiz's question
        options: ['', '', '', ''], // <Array>, 4 defferent options
        answer: '', // <string>, correct quiz's answer that MUST BE in lib.options
    }, 
    {}, // another one and so on
];
```

## Future Features
I plan to implement a few features of the list in the near future:
- dark mode
- stable mobile version
- ability to choose topic of the quiz
- randomizer for an order of library's questions in quiz

## Technologies
Project based on:
- HTML5
- CSS3
- JavaScript

*I believe my solution isn't the best and code can be more optimized as well as technologies I user for this. Feel free to suggest your ideas*

Made by student of Igor Sikorsky KPI
