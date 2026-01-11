import { useState, useEffect } from 'react'
import './styles/App.css'
import languages from './languages'
import clsx from 'clsx'
import { getFarewellText, getRandomWord } from './utils'
import Confetti from 'react-confetti'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        height: innerHeight,
        width: innerWidth
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return windowSize
}

function App() {
  function splitStringInElements(string, elementType) {
    const currentStringArray = string.split('')

    return currentStringArray.map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)

        if (elementType === 'span') {
          return <span key={index} className={clsx({'not-guessed': !guessedLetters.includes(letter)})}>{isGuessed || isGameLost ? letter.toUpperCase() : ''}</span>
        } else {
          const isCorrect = currentWord.includes(letter)
          
          return <button 
            key={letter} 
            className={clsx({
              'correct-key': isGuessed && isCorrect,
              'incorrect-key': isGuessed && !isCorrect
            })}
            style={{opacity: isGameOver ? 0.5 : 1}}
            aria-disabled={isGuessed || isGameOver}
            disabled={isGuessed || isGameOver}
            aria-label={`Letter ${letter}`}
            onClick={() => saveGuessedLetter(letter)}>{letter.toUpperCase()}</button>
        }
      }
    )
  }

  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const windowSize = useWindowSize()

  const wrongGuessCount = guessedLetters.reduce((result, letter) => {
    if (!currentWord.includes(letter)) result++

    return result
  }, 0)

  const totalGuesses = languages.length - 1
  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
  const isGameLost = totalGuesses === wrongGuessCount
  const isGameOver = isGameWon || isGameLost

  const letterElements = splitStringInElements(currentWord, 'span')
  
  const firstRowElements = splitStringInElements('qwertyuiop', 'button')
  const secondRowElements = splitStringInElements('asdfghjkl', 'button')
  const thirdRowElements = splitStringInElements('zxcvbnm', 'button')

  const wordForScreenReader = currentWord.split('').map(letter => guessedLetters.includes(letter) ? letter + '.' : 'blank.').join(' ')
  const lastGuessedLetter = guessedLetters.length > 0 && guessedLetters[guessedLetters.length - 1]

  const farewellMessage = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    ? `"${getFarewellText(languages[wrongGuessCount - 1].name)}"`
    : ''

  const languageTags = languages.map((language, index) => {
    const tagStyles = {
      backgroundColor: language.backgroundColor,
      color: language.color
    }

    const isLost = (index + 1 ) <= wrongGuessCount

    return <span style={tagStyles} key={language.name} className={clsx({lost: isLost})}>{language.name}</span>
  })

  function saveGuessedLetter(letter) {
    setGuessedLetters(prevLetters => {
      if (prevLetters.includes(letter)) return prevLetters

      return [...prevLetters, letter]
    })
  }

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  const gameStatusClass = clsx('game-status', 
      {
        'won': isGameWon, 
        'lost': isGameLost, 
        'farewell': farewellMessage && !isGameOver
      }
    )

  return (
    <main>
      {isGameWon && <Confetti
        height={windowSize.height}
        width={windowSize.width}
        recycle={false}
        numberOfPieces={1000}/>}
      <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section aria-live='polite' role='status' className={gameStatusClass}>
        {isGameOver ? <>
          <h2>{isGameWon ? 'You win!' : 'Game over!'}</h2>
          <p>{isGameWon ? 'Well done! 🎉' : 'You lose! Better start learning Assembly 😭'}</p>
        </> :
        <h2>{farewellMessage}</h2>}
      </section>

      <section className='languages-section'>
        {languageTags}
      </section>

      <section className='word-section'>
        {letterElements}
      </section>

      <section className='sr-only' aria-live='polite' role='status'>
        <p>{currentWord.includes(lastGuessedLetter) 
          ? `Correct! The letter ${lastGuessedLetter} is in the word.` 
          : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {totalGuesses - wrongGuessCount} guesses left</p>
        <p>Current word: {wordForScreenReader}</p>
      </section>

      <section className='keyboard-section'>
        <div>{firstRowElements}</div>
        <div>{secondRowElements}</div>
        <div>{thirdRowElements}</div>
      </section>

      {isGameOver && <button onClick={startNewGame} className='new-game-button'>New Game</button>}
    </main>
  )
}

export default App
