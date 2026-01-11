import { useState, useEffect, useRef } from 'react'
import './styles/App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return windowSize
}

function App() {
  function getDieValue() {
    return Math.ceil(Math.random() * 6)
  }

  function generateAllNewDice() {
    const allDice = []
    for (let i = 0; i < 10; i++) {
      const randomNumber = getDieValue()
      allDice.push({
        value: randomNumber, 
        isHeld: false,
        id: nanoid()
      })
    }

    return allDice
  }

  function holdDie(diceId) {
    setDice(prevDice => prevDice.map(die => {
      if (die.id === diceId) {
        return {
          ...die,
          isHeld: !die.isHeld
        }
      } else return die
    }))
  }

  const [dice, setDice] = useState(() => generateAllNewDice())
  const windowSize = useWindowSize()

  const diceValues = new Set(dice.map(die => die.value))
  const gameWon = dice.every(die => die.isHeld) && diceValues.size === 1

  const diceComponents = dice.map(die => <Die holdDie={holdDie} isHeld={die.isHeld} key={die.id} value={die.value} id={die.id} />)
  
  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      if (die.isHeld) return die
      else {
        return {
          ...die,
          value: getDieValue()
        }
      }
    }))
  }

  function newGame() {
    setDice(generateAllNewDice())
  }

  const newGameRef = useRef(null)

  useEffect(() => {
    if (gameWon) newGameRef.current.focus()
  }, [gameWon])
  
  return (
      <main>
        {gameWon && <Confetti height={windowSize.height} width={windowSize.width}/>}
        <div aria-live='polite' className='sr-only'>
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <section className='info-section'>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </section>
        <section className='die-section'>
          {diceComponents}
        </section>
        <button ref={newGameRef} className='roll-button' onClick={gameWon ? newGame : rollDice}>{gameWon ? 'New Game' : 'Roll'}</button>
      </main>
  )
}

export default App
