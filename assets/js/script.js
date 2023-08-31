var score = 0; var timeLeft = 65;
var currentQuestion = 0;
var timerInterval;
var finishQuiz = true;
var savedScores = JSON.parse(localStorage.getItem("savedScores"));
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
var saveScoreEl = document.querySelector("#saveScore");
var initialsEl = document.querySelector("#initials");
var submitEl = document.querySelector("#submit");
var highScoresEl = document.querySelector("#high-scores")
var displayScoresEl = document.querySelector("#display-scores");
var backEl = document.querySelector("#go-back");
var clearScoreEl = document.querySelector("#clear-scores")
var scoresEl = document.querySelector("#scores");
var initialsInput; var initials; var userScore;
var clickedResponse = 0;
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
        timerInterval = setInterval(function() {
        timeLeft--
        timeEl.textContent = "Time: " + timeLeft;
        if ((timeLeft <= 0 && currentQuestion > 1) || (currentQuestion >= questions.length)) { //If the quiz times out after starting this will go to the quiz over screen without a response being clicked
            quizOver();
        }
    }, 1000)

}

function renderQuestion() { //Clears any current question elements and adds the new one
    questionEl.innerHTML = "";
    questionEl.textContent = questions[currentQuestion].question;
}
function displayResponses() {
    console.log(responsesEl);
    if (currentQuestion == 0) { //If it is the first question, the start and intro elements are hidden
        introEl.setAttribute("hidden", "hidden");
        startEl.setAttribute("hidden", "hidden");
    }
    for (i = 0; i < responsesEl.length; i++) { //Loops through and hides all responses to prevent extra responses from showing from the last question.
        var response = responsesEl[i];
        response.innerHTML = "";
        response.setAttribute("hidden", "hidden");
    }
    for (r = 0; r < questions[currentQuestion].responses.length; r++) { //Sets the text of the responses that exist for the current question and unhides them.
        var response = responsesEl[r];
        console.log(response);
        response.removeAttribute("hidden");
        response.textContent = questions[currentQuestion].responses[r];
     }
}
startEl.addEventListener("click", function() { //When the start button is clicked the timer begins, the score and question are reset, and the questions and responses are rendered for the first question
    finishQuiz = false;
    renderQuestion();
    displayResponses();
    setTime();
    score = 0;
})
responseEl1.addEventListener("click", function(){ //When any of the responses are clicked the program saves which one was clicked and the quiz continues.
    clickedResponse = 0;
    quizProcess();
})
responseEl2.addEventListener("click", function(){ //When any of the responses are clicked the program saves which one was clicked and the quiz continues.
    clickedResponse = 1;
    quizProcess();
})
responseEl3.addEventListener("click", function(){ //When any of the responses are clicked the program saves which one was clicked and the quiz continues.
    clickedResponse = 2;
    quizProcess();
})
responseEl4.addEventListener("click", function(){ //When any of the responses are clicked the program saves which one was clicked and the quiz continues.
    clickedResponse = 3;
    quizProcess();
})
submitEl.addEventListener("click", function() { //When the submit button is clicked the input is saved, the score is saved with the input, and the quiz is reset.
    initialsInput = initialsEl.value.trim();
    saveScore();
    resetQuiz();
})
highScoresEl.addEventListener("click", function() { //Displays all saved high scores by parsing the objects from storage. Gets the key from the saved scores storage array. Only displays the element if it isn't already displaying on matching to prevent duplicates
    if (finishQuiz && (saveScoreEl.hasAttribute("hidden"))) {
        for (var s = 0; s < savedScores.length; s++) {
            var currentScoreKey = savedScores[s];
            var thisScore = JSON.parse(localStorage.getItem(currentScoreKey));
            console.log(thisScore);
            var scoreLi = document.createElement("li");
            scoreLi.textContent = "User: " + thisScore.initials + " - Score: " + thisScore.userScore;
            scoreLi.setAttribute("id", "score" + s);
            if (!(document.getElementById("score" + s)))
            {
                scoresEl.appendChild(scoreLi);
            }
        }
        questionEl.setAttribute("hidden", "hidden");
        introEl.setAttribute("hidden", "hidden");
        startEl.setAttribute("hidden", "hidden");
        displayScoresEl.removeAttribute("hidden");
    }
})
backEl.addEventListener("click", function(){ //Goes back to the quiz starting screen
    resetQuiz();
})
clearScoreEl.addEventListener("click", function(){ //Clears the storage
    localStorage.clear();
})

function quizProcess() { //Any time a response is clicked this function will continue the quiz unless quiz over has been called or the quiz has reached the end of the questions
    if (finishQuiz == false && currentQuestion < (questions.length - 1)) {
        showIfCorrect();
        currentQuestion++;
        renderQuestion();
        displayResponses();
    }
    else {
        quizOver();
    }
}
function resetQuiz() { //This will reset the quiz back to the starting screen
    questionEl.removeAttribute("hidden");
    questionEl.textContent = "Coding Quiz Challenge";
    startEl.removeAttribute("hidden");
    introEl.removeAttribute("hidden");
    saveScoreEl.setAttribute("hidden", "hidden");
    displayScoresEl.setAttribute("hidden", "hidden");
    currentQuestion = 0;
}
function quizOver() { //This function will be called whenever the quiz finishes.
    finishQuiz = true; //Saves the state of the quiz being done to be checked elsewhere
    currentQuestion = 99; //Sets the current question to a placeholder value
    clearInterval(timerInterval); //Stops the timer
    timeEl.textContent = "Time: 0"; //Resets the time element
    for (i = 0; i < responsesEl.length; i++) { //Loops through the responses list and hides them
        var response = responsesEl[i];
        response.setAttribute("hidden", "hidden");
    }
    //Selects the element diplaying right or wrong and hides it.
    var correctEl = document.querySelector("#isItCorrect")
    correctEl.setAttribute("hidden", "hidden");
    questionEl.textContent = "Quiz Over! Please save your high score!"; //Lets the user know that the quiz is over
    saveScoreEl.removeAttribute("hidden"); //Shows the form to submit the high score
}
function saveScore() { //This function saves the score in local storage with a key matching [initials]Score and saves names of the saved scores
    var initialsScore = {
        initials: initialsInput,
        userScore: score
    };
    var thisScoreName = initialsScore.initials + "Score";
    if (savedScores == null) {
        savedScores = [thisScoreName];
    }
    else {
        savedScores.push(thisScoreName);
    }
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    localStorage.setItem(thisScoreName, JSON.stringify(initialsScore));
}   
function checkIfCorrect() { //Checks to see if the user's clicked response is correct
    var correct;
    if (clickedResponse == questions[currentQuestion].answer) {
        correct = true;
    }
    else {
        correct = false;
    }
    return correct;
}

function showIfCorrect() { //Displays to the user whether or not their response was correct. If the correct element has not been created yet it creates it otherwise it just selects it
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