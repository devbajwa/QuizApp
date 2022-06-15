import {quizData} from './data.js';

let question = document.getElementById("question");
let options = document.getElementById("options");
let submit = document.getElementById("submit");
let scoreText = document.getElementById("score");
let totalQuestions = document.getElementById("totalQuestions");
let timerText = document.getElementById("timer");

let quizLength = quizData.length;
let currentQuiz = 0;
let score = 0;
let t;
let timeUp;


  

loadQuiz();

function loadQuiz() {

    timeUp = 0;
  question.innerHTML = `<h2><span>Q${currentQuiz+1}:</span> ${quizData[currentQuiz].question}?</h2>`;

  totalQuestions.innerText = `Total Questions: ${quizLength}`;
  scoreText.innerText = `Score: ${score}`;
  for (let key in quizData[currentQuiz]) {
    if (key !== "question" && key !== "correct") {
      options.innerHTML += `<li><input class="ans" type="radio" id="${key}" name="_answer" value="${quizData[currentQuiz][key]}"><label for="${key}">${quizData[currentQuiz][key]}</label></li>`;
    }
  }
  if(currentQuiz == quizData.length-1){
      submit.textContent = 'Submit';
  }
  timeRemains();
}

function getSelected() {
  let answers = document.querySelectorAll(".ans");

  for (const answer in answers) {
    if (answers[answer].checked == true) {
      return answers[answer].id;
    }
  }
}

function clearAll() {
  options.innerHTML = ``;
  clearInterval(t);
}

function startTimer(duration, display) {
 var timer = duration, minutes, seconds;
    t = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Time remains: "+ minutes + ":" + seconds;

        if (--timer < 0) {
            //timer = duration;
            clearInterval(t);
            timeUp = timer;
            goNext();
        }
    }, 1000);
}

function timeRemains() {
    var oneMinute = 10 * 1,
        display = timerText;
    startTimer(oneMinute, display);
};

submit.addEventListener("click", goNext);

function goNext(){
    let answer = getSelected();
    if (answer || timeUp==-1) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
        scoreText.innerText = `Score: ${score}`;
      }
      currentQuiz++;
      if (currentQuiz < quizLength) {
        clearAll();
        loadQuiz();
      } else {
        document.getElementById(
          "quizWrapper"
        ).innerHTML = `<div class="result">You have answered ${score}/${quizLength} correct <span class="tomato">:)</span><p><button onClick="document.location.reload()">Reload</button></p></div>
          `;
      }
    }
}


