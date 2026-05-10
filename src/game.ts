const colors = [
  'RED',
  'BLUE',
  'GREEN',
  'YELLOW'
]


const colorMap: Record<string, string> = {
  RED: '#ef4444',
  BLUE: '#3b82f6',
  GREEN: '#21a652',
  YELLOW: '#facc15'
}

function randomColor() {
  return colors[
    Math.floor(Math.random() * colors.length)
  ]
}

export function updateTimer(timeLeft: number) {
  document.querySelector('#timer')!.textContent =
    'Time Left: ' + timeLeft + 's'
}

export function updateScore(
  correct: number,
  wrong: number,
  totalReactionTime: number
) {
  const total = correct + wrong

  const accuracy =
    total === 0
      ? 0
      : Math.round((correct / total) * 100)

  const averageReaction =
    total === 0
      ? 0
      : Math.round(totalReactionTime / total)

  document.querySelector('#correct-score')!.textContent =
    String(correct)

  document.querySelector('#wrong-score')!.textContent =
    String(wrong)

  document.querySelector('#accuracy-score')!.textContent =
    accuracy + '%'

  document.querySelector('#reaction-time')!.textContent =
    averageReaction + ' ms'
}

export function generateQuestion() {
  const randomWord = randomColor()
  const correctColor = randomColor()

  const word =
    document.querySelector('#word') as HTMLDivElement

  // 🧠 คำที่แสดง (RED / BLUE / GREEN / YELLOW)
  word.innerText = randomWord

  // 🎯 สีตัวอักษร (ใช้ HEX จริง)
  word.style.color = colorMap[correctColor]

  return {
    correctColor,
    startTime: performance.now()
  }
}

export function resetGame() {
  const resultScreen =
    document.querySelector('.result-screen') as HTMLDivElement

  resultScreen.style.display = 'none'

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  gameScreen.style.display = 'flex'
}

export function endGame(
  correct: number,
  wrong: number,
  totalReactionTime: number
) {
  const total = correct + wrong

  const accuracy =
    total === 0
      ? 0
      : Math.round((correct / total) * 100)

  const averageReaction =
    total === 0
      ? 0
      : Math.round(totalReactionTime / total)

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  gameScreen.style.display = 'none'

  const resultScreen =
    document.querySelector('.result-screen') as HTMLDivElement

  resultScreen.style.display = 'flex'

  document.querySelector('#final-correct')!.textContent =
    String(correct)

  document.querySelector('#final-wrong')!.textContent =
    String(wrong)

  document.querySelector('#final-accuracy')!.textContent =
    accuracy + '%'

  document.querySelector('#final-reaction')!.textContent =
    averageReaction + ' ms'
}