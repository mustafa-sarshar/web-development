const RANGE_SCALE = 10
const RANGE_SHIFT = -10
const OPERANDS = ["+", "-", "x", "÷"]

let num1 = Math.floor(Math.random() * RANGE_SCALE + RANGE_SHIFT)
let num2 = Math.floor(Math.random() * RANGE_SCALE + RANGE_SHIFT)
let operand = "+"
let correctAnswer = 0

const questionEl = document.getElementById("txt-question")
const answerEl = document.getElementById("txt-answer")
const formEl = document.getElementById("form")

let score = JSON.parse(localStorage.getItem("score"))
if (!score) score = 0
const scoreEl = document.getElementById("txt-score")
scoreEl.textContent = `Score: ${score}`

function updateQuestion() {
    let num1 = Math.floor(Math.random() * RANGE_SCALE + RANGE_SHIFT)
    let num2 = Math.floor(Math.random() * RANGE_SCALE + RANGE_SHIFT)    
    
    operand = OPERANDS[Math.floor(Math.random() * OPERANDS.length)]
    if (operand === "+") {
        correctAnswer = num1 + num2
    } else if (operand === "-") {
        correctAnswer = num1 - num2
    } else if (operand === "x") {
        correctAnswer = num1 * num2
    } else {
        correctAnswer = num1 / num2
    }
    correctAnswer = +correctAnswer.toFixed(2);
    questionEl.innerHTML = `What is <span class="equation"> ${num1} ${operand} ${num2} </span>?`
}

formEl.addEventListener("submit", () => {
    let userAnswer = +answerEl.value    
    if (userAnswer == correctAnswer) score++
    else score--
    updateLocalStorage()
    console.log(userAnswer, correctAnswer, score)
})

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score))
}

window.onload = (event) => {
    updateQuestion()    
}