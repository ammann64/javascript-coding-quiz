var score = 0; var timeLeft = 0;
var timeEl = document.querySelector("time");
var mainEl = document.querySelector("main");
var startEl = document.querySelector("start");
var h1El = document.querySelector("h1");
var questions = [
    {question: "What is the difference between a method and a function?", responses: ["A method is defined as part of an object while a function is standalone", 
        "A function is defined as part of an object while a method is standalone", "A function can be called while a method cannot", "A method cannot take arguments while a function can"], answer: 0},
    {question: "Which of these is a valid logical operator?", responses: ["++", ">>", "^^", "||"], answer: 3},
    {question: "In what circumstances will a while loop stop iterating?", responses: ["When it reaches the set limit of iterations", "When its condition is met", "When the user exits the program"], answer: 1},
    {question: "True or false: A string is indexed much the same as an array.", responses: ["True", "False"], answer:0},
    {question: "Which of these is not a valid comparison operator?", responses: [">", "!=", "=", "<="], answer: 2},
    {question: "What method is used to convert key value pairs into a format readable by the browser?", responses: ["Parse", "Stringify", "ToString", "Convert"], answer: 1},
    {question: "What symbol is required to denote the end of the line for variable declarations and most statements?", responses: [":", ",", ";", "."], answer: 2},
    {question: "Which of the following is reserved and therefore not a valid variable name?", responses: ["main", "function", "math", "javascript"], answer: 1},
    {question: "Which of the following is a valid boolean value?", responses: ["true", "False", "0", "No"], answer: 0},
    {question: "What will happen if 2 strings are added together?", responses: ["The program will throw an error", "The statement will return the numerical value of the two lengths of the strings added",
        "The strings will be concatenated"], answer: 2}
];
function startQuiz() {
    var currentQuestion = 0;
    while (time > 0) {

    }
    time = 65;
    setTime();
}
function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--
        timeEl.textContent = "Time: " + timeLeft;
        

    }, 1000)
}