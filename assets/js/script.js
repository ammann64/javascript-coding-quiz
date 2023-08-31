var score = 0; var timeLeft = 65;
var currentQuestion = 0;
var timeEl = document.querySelector("#time");
var introEl = document.querySelector("#intro");
var mainEl = document.querySelector("main");
var responsesEl = document.querySelectorAll(".responses");
var responseEl1 = document.querySelector("#response1");
var responseEl2 = document.querySelector("#response2");
var responseEl3 = document.querySelector("#response3"); 
var responseEl4 = document.querySelector("#response4");
var startEl = document.querySelector("#start");
var questionEl = document.querySelector("#question");
var clickedResponse;
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

function setTime() {        //Counts down the time remaining until the quiz is over
    var timerInterval = setInterval(function() {
        timeLeft--
        timeEl.textContent = "Time: " + timeLeft;
    }, 1000)
}

function renderQuestion() { //Clears any current question elements and adds the new one
    questionEl.innerHTML = "";
    questionEl.textContent = questions[currentQuestion].question;
}
function displayResponses() {
    console.log(responsesEl);
    if (currentQuestion == 0) {
        introEl.setAttribute("hidden", "hidden");
        startEl.setAttribute("hidden", "hidden");
    }
    for (i = 0; i < responsesEl.length; i++) {
        var response = responsesEl[i];
        response.setAttribute("hidden", "hidden");
    }
    for (r = 0; r < questions[currentQuestion].responses.length; r++) {
        var response = responsesEl[r];
        console.log(response);
        response.removeAttribute("hidden");
        response.innerHTML = "";
        response.textContent = questions[currentQuestion].responses[r];
     }
}
startEl.addEventListener("click", function() {
    renderQuestion();
    displayResponses();
    setTime();
})
responseEl1.addEventListener("click", function(){
    clickedResponse = 0;
    quizProcess();
})
responseEl2.addEventListener("click", function(){
    clickedResponse = 1;
    quizProcess();
})
responseEl3.addEventListener("click", function(){
    clickedResponse = 2;
    quizProcess();
})
responseEl4.addEventListener("click", function(){
    clickedResponse = 3;
    quizProcess();
})
function quizProcess() {
    showIfCorrect();
    currentQuestion++;
    renderQuestion();
    displayResponses();
}
function quizOver() {

}
function checkIfCorrect() {
    var correct;
    if (clickedResponse == questions[currentQuestion].answer) {
        correct = true;
    }
    else {
        correct = false;
    }
    return correct;
}

function showIfCorrect() {
    if (currentQuestion == 0) {
        var isItCorrect = document.createElement("h2");
        isItCorrect.setAttribute("id", "isItCorrect");
        if (checkIfCorrect()) {
            isItCorrect.textContent = "Right!";
            score++
        }
        else {
            isItCorrect.textContent = "Wrong!";
            timeLeft -= 10;
        }
        mainEl.appendChild(isItCorrect);
    }
    else {
        var correctEl = document.querySelector("#isItCorrect")
        if (checkIfCorrect()) {
            correctEl.textContent = "Right!";
            score++
        }
        else {
            correctEl.textContent = "Wrong!";
            timeLeft -= 10;
        }
    }

}