import './style.css'

import {
  updateTimer,
  updateScore,
  generateQuestion,
  resetGame,
  endGame
} from './game'

let correct = 0
let wrong = 0
let totalReactionTime = 0

let timeLeft = 10
let selectedTime = 10

let gameEnded = false
let gameStarted = false

let currentCorrectColor = ''
let currentStartTime = 0

let timerInterval: ReturnType<typeof setInterval> | null = null

// ================= RENDER UI =================
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

<div class="start-screen">

  <h1>Stroop Test Game</h1>

  <p class="intro">
    Identify the COLOR of the text,
    not the word itself.
  </p>

  <ul>
    <li>Click the correct color button</li>
    <li>Respond as fast as possible</li>
    <li>You have limited time</li>
  </ul>

  <!-- TIME SELECT -->
  <div class="time-select">

    <p>Select Time</p>

    <div class="time-buttons">
      <button class="time-btn active" data-time="10">10s</button>
      <button class="time-btn" data-time="20">20s</button>
      <button class="time-btn" data-time="30">30s</button>
    </div>

  </div>

  <button id="start-btn" class="start-btn">
    START TEST
  </button>

</div>

<div class="game-screen" style="display:none">

  <!-- EXIT BUTTON -->
  <button id="exit-btn" class="exit-btn">
    EXIT
  </button>

  <p class="subtitle">
    Cognitive Control • Focus • Attention
  </p>

  <h2 id="timer">Time Left: 30s</h2>

  <div class="metrics">

    <div class="metric-card">
      <span>Correct</span>
      <h2 id="correct-score">0</h2>
    </div>

    <div class="metric-card">
      <span>Wrong</span>
      <h2 id="wrong-score">0</h2>
    </div>

    <div class="metric-card">
      <span>Accuracy</span>
      <h2 id="accuracy-score">0%</h2>
    </div>

    <div class="metric-card">
      <span>Avg Response</span>
      <h2 id="reaction-time">0 ms</h2>
    </div>

  </div>

  <div id="word" class="word">RED</div>

  <div class="buttons">

    <button data-color="RED">RED</button>
    <button data-color="BLUE">BLUE</button>
    <button data-color="GREEN">GREEN</button>
    <button data-color="YELLOW">YELLOW</button>

  </div>

</div>

<div class="result-screen" style="display:none">

  <h1>Final Result</h1>

  <div class="result-card">

    <p>Correct: <span id="final-correct">0</span></p>
    <p>Wrong: <span id="final-wrong">0</span></p>
    <p>Accuracy: <span id="final-accuracy">0%</span></p>
    <p>Avg Response: <span id="final-reaction">0 ms</span></p>

  </div>

  <div class="result-buttons">

    <button id="restart-btn" class="restart-btn">
      PLAY AGAIN
    </button>

    <button id="back-btn" class="restart-btn">
      BACK TO START
    </button>

  </div>

</div>

`

// ================= TIME SELECT =================
const timeButtons =
  document.querySelectorAll('.time-btn')

timeButtons.forEach((btn) => {

  btn.addEventListener('click', () => {

    timeButtons.forEach(b =>
      b.classList.remove('active')
    )

    btn.classList.add('active')

    selectedTime =
      Number(btn.getAttribute('data-time'))

    updateTimer(selectedTime)
  })

})

// ================= START GAME =================
const startBtn =
  document.querySelector('#start-btn') as HTMLButtonElement

startBtn.addEventListener('click', () => {

  resetAllState()

  gameStarted = true
  gameEnded = false

  timeLeft = selectedTime

  const startScreen =
    document.querySelector('.start-screen') as HTMLDivElement

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  startScreen.style.display = 'none'
  gameScreen.style.display = 'flex'

  updateScore(0, 0, 0)
  updateTimer(timeLeft)

  startTimer()
  startNewQuestion()
})

// ================= TIMER =================
const startTimer = () => {

  if (timerInterval) {
    clearInterval(timerInterval)
  }

  timerInterval = setInterval(() => {

    if (!gameStarted) return
    if (gameEnded) return

    timeLeft--

    updateTimer(timeLeft)

    if (timeLeft <= 0) {

      gameEnded = true

      if (timerInterval) {
        clearInterval(timerInterval)
      }

      endGame(
        correct,
        wrong,
        totalReactionTime
      )
    }

  }, 1000)
}

// ================= QUESTION =================
const startNewQuestion = () => {

  const question =
    generateQuestion()

  currentCorrectColor =
    question.correctColor

  currentStartTime =
    question.startTime
}

// ================= COLOR BUTTONS =================
const buttons =
  document.querySelectorAll('.buttons button')

buttons.forEach((button) => {

  button.addEventListener('click', () => {

    if (gameEnded) return
    if (!gameStarted) return

    const selectedColor =
      button.getAttribute('data-color')

    const reactionTime =
      performance.now() - currentStartTime

    totalReactionTime += reactionTime

    if (selectedColor === currentCorrectColor) {

      correct++

    } else {

      wrong++

    }

    updateScore(
      correct,
      wrong,
      totalReactionTime
    )

    startNewQuestion()
  })

})

// ================= EXIT BUTTON =================
const exitBtn =
  document.querySelector('#exit-btn') as HTMLButtonElement

exitBtn.addEventListener('click', () => {

  gameEnded = true
  gameStarted = false

  if (timerInterval) {
    clearInterval(timerInterval)
  }

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  const startScreen =
    document.querySelector('.start-screen') as HTMLDivElement

  gameScreen.style.display = 'none'
  startScreen.style.display = 'flex'
})

// ================= PLAY AGAIN =================
const restartBtn =
  document.querySelector('#restart-btn') as HTMLButtonElement

restartBtn.addEventListener('click', () => {

  resetAllState()

  gameStarted = true
  gameEnded = false

  timeLeft = selectedTime

  updateScore(0, 0, 0)
  updateTimer(timeLeft)

  resetGame()

  startTimer()
  startNewQuestion()
})

// ================= BACK TO START =================
const backBtn =
  document.querySelector('#back-btn') as HTMLButtonElement

backBtn.addEventListener('click', () => {

  resetAllState()

  updateScore(0, 0, 0)
  updateTimer(selectedTime)

  const resultScreen =
    document.querySelector('.result-screen') as HTMLDivElement

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  const startScreen =
    document.querySelector('.start-screen') as HTMLDivElement

  resultScreen.style.display = 'none'
  gameScreen.style.display = 'none'
  startScreen.style.display = 'flex'
})

// ================= RESET FUNCTION =================
const resetAllState = () => {

  correct = 0
  wrong = 0

  totalReactionTime = 0

  gameEnded = false
  gameStarted = false

  timeLeft = selectedTime

  if (timerInterval) {

    clearInterval(timerInterval)

    timerInterval = null
  }
}