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

// ================= GAME STATE =================

let lastWord = ''
let lastColor = ''

let totalReactionTime = 0

// ================= FAIRNESS STATS =================

let colorStats = {
  RED: 0,
  BLUE: 0,
  GREEN: 0,
  YELLOW: 0
}

let wordRepeatRerolls = 0
let colorRepeatRerolls = 0
let congruentRerolls = 0

// ================= RANDOM =================

function randomFromArray(
  array: string[]
){

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ]
}

// ================= TIMER =================

export function updateTimer(
  timeLeft: number
){

  document.querySelector('#timer')!.textContent =
    'Time Left: ' + timeLeft + 's'
}

// ================= SCORE =================

export function updateScore(
  score: number,
  averageReaction: number
){

  document.querySelector('#correct-score')!.textContent =
    String(score)

  document.querySelector('#reaction-time')!.textContent =
    averageReaction + ' ms'
}

// ================= FAIR QUESTION =================

export function generateQuestion(){

  // ================= WORD =================

  let availableWords =
    colors.filter(
      color => color !== lastWord
    )

  // track reroll
  if(availableWords.length < colors.length){

    wordRepeatRerolls++
  }

  let randomWord =
    randomFromArray(
      availableWords
    )

  // ================= VALID COLORS =================

  let availableColors =
    colors.filter(color => {

      // ❌ no same color repeat
      if(color === lastColor){

        colorRepeatRerolls++

        return false
      }

      // ❌ no congruent
      if(color === randomWord){

        congruentRerolls++

        return false
      }

      return true
    })

  // ================= DISTRIBUTION BALANCE =================

  const minCount =
    Math.min(
      ...availableColors.map(
        color =>
          colorStats[
            color as keyof typeof colorStats
          ]
      )
    )

  const balancedColors =
    availableColors.filter(
      color =>
        colorStats[
          color as keyof typeof colorStats
        ] === minCount
    )

  let correctColor =
    randomFromArray(
      balancedColors
    )

  // ================= SAVE STATE =================

  lastWord = randomWord
  lastColor = correctColor

  colorStats[
    correctColor as keyof typeof colorStats
  ]++

  // ================= RENDER =================

  const word =
    document.querySelector('#word') as HTMLDivElement

  word.innerText =
    randomWord

  word.style.color =
    colorMap[correctColor]

  return {

    correctColor,

    startTime:
      performance.now()
  }
}

// ================= REACTION =================

export function addReactionTime(
  reactionTime: number
){

  totalReactionTime += reactionTime
}

export function getAverageReaction(
  score: number
){

  if(score === 0){

    return 0
  }

  return Math.round(
    totalReactionTime / score
  )
}

// ================= RESET =================

export function resetGame(){

  totalReactionTime = 0

  lastWord = ''
  lastColor = ''

  colorStats = {
    RED: 0,
    BLUE: 0,
    GREEN: 0,
    YELLOW: 0
  }

  wordRepeatRerolls = 0
  colorRepeatRerolls = 0
  congruentRerolls = 0

  const resultScreen =
    document.querySelector('.result-screen') as HTMLDivElement

  resultScreen.style.display =
    'none'

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  gameScreen.style.display =
    'flex'
}

// ================= END GAME =================

export function endGame(
  score: number
){

  const averageReaction =
    getAverageReaction(score)

  const gameScreen =
    document.querySelector('.game-screen') as HTMLDivElement

  gameScreen.style.display =
    'none'

  const resultScreen =
    document.querySelector('.result-screen') as HTMLDivElement

  resultScreen.style.display =
    'flex'

  // ================= SCORE =================

  document.querySelector('#final-correct')!.textContent =
    String(score)

  document.querySelector('#final-reaction')!.textContent =
    averageReaction + ' ms'
}