import { useEffect, useState } from "react";
import UseApp from "./UseApp";
import WordGrid from "./WordGrid";
import Keypad from "./Keypad";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = UseApp(solution)
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
        setTimeout(() => setShowModal(true), 1500)
        window.removeEventListener('keyup', handleKeyup)
    }

    if (turn > 5) {
        setTimeout(() => setShowModal(true), 1500)
        window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])
  
  
  return (
    
    <div className="main-grid-container">
        {/* <div>solution - {solution}</div>
        <div>Current Guess - {currentGuess}</div> */}

        <WordGrid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        {/* <Keypad usedKeys={usedKeys}/> */}
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}

export default Wordle