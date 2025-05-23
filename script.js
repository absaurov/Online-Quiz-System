// Quiz Questions
const quizQuestions = [
    // Questions 1-5 (web development topics)
    {
        question: "Which HTML tag is used to define an internal stylesheet?",
        options: ["<script>", "<css>", "<style>", "<link>"],
        correctAnswer: 2
    },
    {
        question: "In CSS, which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "bg-color"],
        correctAnswer: 2 // Fixed index (was 3)
    },
    {
        question: "Which JavaScript method is used to select an HTML element by its ID?",
        options: ["document.querySelector()", "document.getElementByTagName()", "document.getElementById()", "document.findElement()"],
        correctAnswer: 2 // Fixed index (was 3)
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<linebreak>"],
        correctAnswer: 2 // Fixed index (was 3)
    },
    {
        question: "Which CSS selector matches all <p> elements with class='intro'?",
        options: ["p.intro", "p.retro", "#p.intro", "p .@intro"],
        correctAnswer: 0 // Fixed index (was 1) and fixed option (was p.retro)
    },
    
    {
        question: "Which HTML5 element is used for sidebar content?",
        options: ["<sidebar>", "<aside>", "<nav>", "<section>"],
        correctAnswer: 1
    },
    {
        question: "What is the correct HTML for inserting an image?",
        options: [
            "<img src='image.jpg' alt='My Image'>",
            "<image src='image.jpg' alt='My Image'>",
            "<img href='image.jpg' alt='My Image'>",
            "<img src='image.jpg' title='My Image'>"
        ],
        correctAnswer: 0
    },
    {
        question: "Which attribute is used to make a checkbox checked by default?",
        options: ["selected", "checked", "default", "on"],
        correctAnswer: 1
    },
    
    // New CSS questions
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 2
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        correctAnswer: 2
    },
    {
        question: "How do you select an element with id 'header' in CSS?",
        options: [".header", "#header", "*header", "header"],
        correctAnswer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["text-style", "font-size", "text-size", "font-style"],
        correctAnswer: 1
    },
    {
        question: "What is the correct CSS syntax for making all <p> elements bold?",
        options: [
            "p {text-weight: bold;}",
            "p {font: bold;}",
            "p {style: bold;}",
            "p {font-weight: bold;}"
        ],
        correctAnswer: 3
    },
    
    // New JavaScript questions
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');"
        ],
        correctAnswer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function = myFunction()",
            "function:myFunction()",
            "function myFunction()",
            "create myFunction()"
        ],
        correctAnswer: 2
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "=", "-", "x"],
        correctAnswer: 1
    },
    {
        question: "What will this return: Boolean(10 > 9)?",
        options: ["true", "false", "NaN", "undefined"],
        correctAnswer: 0
    },
    {
        question: "Which method removes the last element from an array?",
        options: ["pop()", "shift()", "remove()", "delete()"],
        correctAnswer: 0
    },
    
    // New PHP questions
    {
        question: "What does PHP stand for?",
        options: [
            "Personal Home Page",
            "PHP: Hypertext Preprocessor",
            "Private Home Page",
            "Personal Hypertext Processor"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you start a PHP session?",
        options: [
            "session_begin()",
            "start_session()",
            "session_start()",
            "begin_session()"
        ],
        correctAnswer: 2
    },
    {
        question: "Which superglobal variable holds information about headers, paths, and script locations?",
        options: ["$_GET", "$_SERVER", "$_SESSION", "$_GLOBALS"],
        correctAnswer: 1
    },
    {
        question: "What is the correct way to end a PHP statement?",
        options: ["?>", ";", ".", "New line"],
        correctAnswer: 1
    },
    {
        question: "Which function is used to redirect a user to a new page in PHP?",
        options: [
            "redirect()",
            "header()",
            "location()",
            "forward()"
        ],
        correctAnswer: 1
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');
const currentScore = document.getElementById('current-score');
const timeDisplay = document.getElementById('time');
const finalScore = document.getElementById('final-score');
const maxScore = document.getElementById('max-score');
const correctAnswers = document.getElementById('correct-answers');
const wrongAnswers = document.getElementById('wrong-answers');
const timeTaken = document.getElementById('time-taken');

// Quiz Variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);
let timer;
let timeLeft = 600;
let quizStartTime;

// Initialize the quiz
function initQuiz() {
    totalQuestions.textContent = quizQuestions.length;
    maxScore.textContent = quizQuestions.length;
    loadQuestion();
    startTimer();
    quizStartTime = new Date();
}

// Load question
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionNumber.textContent = currentQuestionIndex + 1;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        
        // Check if this option was previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }
        
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.classList.add('hide');
        submitBtn.classList.remove('hide');
    } else {
        nextBtn.classList.remove('hide');
        submitBtn.classList.add('hide');
    }
}

// Select option
function selectOption(optionIndex) {
    // Remove selected class from all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    document.querySelectorAll('.option-btn')[optionIndex].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Check if answer is correct
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (optionIndex === currentQuestion.correctAnswer) {
        // Update score if not previously answered
        if (userAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer) {
            score++;
            currentScore.textContent = score;
        }
    } else {
        // Deduct score if previously had correct answer
        if (userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer) {
            score--;
            currentScore.textContent = score;
        }
    }
}

// Show next question
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Show previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Submit quiz
function submitQuiz() {
    clearInterval(timer);
    const quizEndTime = new Date();
    const timeTakenSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
    
    // Calculate correct and wrong answers
    let correctCount = 0;
    let wrongCount = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            correctCount++;
        } else if (answer !== null) {
            wrongCount++;
        }
    });
    
    // Display results
    finalScore.textContent = score;
    correctAnswers.textContent = correctCount;
    wrongAnswers.textContent = wrongCount;
    timeTaken.textContent = timeTakenSeconds;
    
    // Show result screen
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
}

// Start timer
function startTimer() {
    timeLeft = 180;
    timeDisplay.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

// Event Listeners
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    initQuiz();
});

nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', submitQuiz);

restartBtn.addEventListener('click', () => {
    // Reset quiz variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    currentScore.textContent = '0';
    
    // Show start screen
    resultScreen.classList.add('hide');
    startScreen.classList.remove('hide');
});