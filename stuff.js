

function buildQuiz() {
  const output = [];
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
      );
    }
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
    );
  });
  quizContainer.innerHTML = output.join("");
}

let counter = 120;

let count = function () {
    const counting = document.getElementById("timer");
    counting.innerHTML = `${counter}`;
    counter--;
    if (counter === 0) {

      console.log("TIME UP");
      showResults();
    }
  
}




function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  const percentage = Math.round((numCorrect / myQuestions.length) * 100) + '%';
  resultsPercentage.innerHTML = `${percentage}`;

  clearInterval(finalCount)
}
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const resultsPercentage = document.getElementById("resultsPercentage");

const submitButton = document.getElementById("submit");
const myQuestions = [
  {
    question: "Who is the strongest?",
    answers: {
      a: "Superman",
      b: "The Terminator",
      c: "Waluigi, obviously"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the best site ever created?",
    answers: {
      a: "SitePoint",
      b: "Simple Steps Code",
      c: "Trick question; they're both the best"
    },
    correctAnswer: "c"
  },
  {
    question: "Where is Waldo really?",
    answers: {
      a: "Antarctica",
      b: "Exploring the Pacific Ocean",
      c: "Sitting in a tree",
      d: "Minding his own business, so stop asking"
    },
    correctAnswer: "d"
  }
];

buildQuiz();
let finalCount = setInterval(count, 1000);

submitButton.addEventListener("click", showResults);
