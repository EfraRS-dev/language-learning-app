const questionNumer = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const instBox = document.querySelector(".inst-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let quiz = []; // Aquí se almacenarán las preguntas cargadas dinámicamente
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// Función para cargar las preguntas desde el backend
async function fetchQuizData(lessonID) {
    const url = `http://localhost:8000/questions/${lessonID}`; // Cambia según tu endpoint
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        quiz = await response.json(); // Asigna las preguntas cargadas
        console.log('Quiz data loaded:', quiz);
        initializeQuiz(); // Inicializa el quiz después de cargar los datos
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
    }
}

// Inicializar el quiz después de cargar los datos
function initializeQuiz() {
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}

// Resto del código original de app.js
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i]);
    }
}

function getNewQuestion() {
    questionNumer.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    optionContainer.innerHTML = "";

    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);

    const optionsLen = currentQuestion.options.length;
    for (let i = 0; i < optionsLen; i++) {
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';

    let animationDelay = 0.15;

    for (let i = 0; i < optionsLen; i++) {
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + "s";
        animationDelay += 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++;
}

function getResult(element) {
    const id = parseInt(element.id);
    if (id === currentQuestion.answer) {
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;

    } else {
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    attempt++;
    unclickableOptions();
}

function unclickableOptions() {
    const options = document.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            optionContainer.children[i].classList.add("already-answered");
        }
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function next() {
    if (questionCounter == quiz.length) {
        console.log("No more questions");
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");

    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt - 1;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
}

window.onload = function () {
    const lessonID = 1101; // Cambia según sea necesario
    fetchQuizData(lessonID); // Llama a la función para cargar los datos
};
