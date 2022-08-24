const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
var highScore = 0; // Score add fix for ticking timer.
var viewHighScoresBtnEl = document.getElementById('view-high-scores'); // View High Scores Btn El
var submitScoreEl = document.getElementById('submitScore'); // Start Quiz button Btn El
var finalScoreDisplayEl = document.createElement("finalScoreDisplay"); // Display Question
var enterInitialsEl = document.createElement("enterInitials"); // Enter initials
var enterInitialsTextAreaEl = document.createElement("enterInitialsTextArea"); // TextArea
var timerElement = document.querySelector('.timer-count');
var timer;
var timerCount;
submitScoreEl.style.display = 'none';
enterInitialsTextArea.style.display='none';

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


viewHighScoresBtnEl.addEventListener("click", function() { // View high scores

    var quizUsers = "";
    var substringTest ="";
    var highScores = "";

    for (var i=0; i < localStorage.length; i++) {
        var checkUserValue = [];
        
        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0,4) 
        if (substringTest == "quiz") {
            checkUserValue = quizUsers.split(",");
            var userName = checkUserValue[0]
            highScores += "User " + userName.substring(4) + " high score is: " + checkUserValue[1] + "\n";
       }
    }
    window.alert(highScores);

});

submitScoreEl.addEventListener("click", function() { // Submit high scores
    

    var quizLocalStorage = "quiz";
    var quizUserDetails = "";
    var value = [];
    
    //If good input the value will be assign properly.
    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value 
    value = [quizUserDetails,highScore] // Create an array for validation


    // Add test entry @local storage in order to be able to get the lentgh of the local storage.
    // If user clears the data at local storage the below code will not work unless there is at least on entry.
    if (!localStorage.length) {
        localStorage.setItem("test","test");
    }
       
        
    for (var i=0; i < localStorage.length; i++){
        
        var checkUser = "";
        var checkUserValue = [];

        // Assign value again
        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;

        // Check if assigned value exist in the local storage
        checkUser = localStorage.getItem(quizUserDetails);
        // quizInitial + score will be checked against the input from the user to validate if exist already in local storage
   
        if (checkUser == null) { // New user, no need to split
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("Your score of " + highScore + " has been submitted!")
            break;
        } else if (checkUser != null){
            checkUserValue = checkUser.split(","); // Split since the ojbect exist in local storage
           
        
        }  



              
        if ( quizUserDetails == checkUserValue[0] && highScore == checkUserValue[1] ) {

       
        // Only insert if the current highScore is higher, 
        // otherwise let the user know they had a higher score alreay
        localStorage.setItem(quizUserDetails, value); // Value is equal to 
        window.alert(highScore + " " + "is the latest entry for user initial " + enterInitialsTextArea.value + ". Entry will not be added.")
        break; 
        } else if (enterInitialsTextArea.value == "") {
            window.alert("Please enter an initial");
            break;
        } else if ( quizUserDetails == checkUserValue[0] && highScore > checkUserValue[1] ) { 
            // New high score submitted!
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("New high score of " + highScore + " has been submitted!.\nYour previous score was " + checkUserValue[1])
            break; 
        } else if ( quizUserDetails == checkUserValue[0] && highScore < checkUserValue[1] ) { 
            // Your previous code was higher!
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("Your previous code of " + checkUserValue[1] + " was higher. Entry will not be added.");
            break; 

        } else { // New entry all together
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("Your score of " + highScore + " has been submitted!")
            break;
        }
                
    }
    
} );
 

function startGame() {
 startButton.classList.add('hide')
 timerCount = 60;
 shuffledQuestions = questions.sort(() => Math.random() - .5)
 currentQuestionIndex = 0
 finalScoreDisplay.style.display = 'none';
    enterInitials.style.display='none';
 questionContainerElement.classList.remove('hide')
 setNextQuestion();
 startTimer();
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount === 0) {
            nextButton.classList.add('hide')
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
            clearInterval(timer);
        }
    }, 1000)
}

function setNextQuestion() {
    resetState()
 showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
 questionElement.innerText = question.question
 question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
   if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
 })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
 const selectedButton = e.target
 const correct = selectedButton.dataset.correct;
 const wrong = selectedButton.dataset.wrong;
setStatusClass(document.body, correct, true)
if(correct){
    highScore += 10;
    console.log(highScore)
} else {
    highScore -= 0;
}
 if (shuffledQuestions.length > currentQuestionIndex + 1) {
 nextButton.classList.remove('hide')
} else {
    finalScoreDisplay.style.display = ""; // Allow display for final score
enterInitials.style.display = ""; // Display Message Enter initials
enterInitialsTextArea.style.display="";  // Capture user score once submitted is clicked.
finalScoreDisplay.textContent = "Your final score is: " + highScore; // Assign the latest high score.
enterInitials.textContent = "Enter initials: "
submitScoreEl.style.display = "";
submitScoreEl.textContent = "Submit"; 
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}
}



function setStatusClass(element, correct, reduceTimer) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    
    else {
        if(timerCount > 0 && reduceTimer) {
        timerCount -= 10;
        }
        timerElement.innerHTML = timerCount;
        element.classList.add('wrong')
}}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    {
        question: 'What is a Script tag?',
        answers: [
            {text: 'JavaScript Link', correct: true },
            {text: 'CSS Link', wrong: false }
        ]
    },
    {
        question: 'What isnt an Array',
        answers: [
            {text: 'Variables', correct: true },
            {text: 'Boolean', wrong: false },
            {text: 'Numbers', wrong: false },
            {text: 'Text', wrong: false }
        ]
     },
    {
        question: 'What is a <p> tag',
        answers: [
            {text: 'paragraph', correct: true },
            {text: 'Boolean', wrong: false },
            {text: 'Numbers', wrong: false },
            {text: 'Text', wrong: false }
        ]
    },
    {
        question: 'worst coder',
        answers: [
            {text: 'me', correct: true },
            {text: 'Boolean', correct: false },
            {text: 'Numbers', correct: false },
            {text: 'Text', correct: false }
        ]
    },
    {
        question: 'do i understand this?',
        answers: [
            {text: 'no', correct: true },
            {text: 'Boolean', correct: false },
            {text: 'Numbers', correct: false },
            {text: 'Text', correct: false }
        ]
    }
]
