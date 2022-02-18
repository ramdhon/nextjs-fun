import { useEffect, useState, useContext } from "react";
import AppContext from '../context'

export default function TypingText({ delay: delayToType = 0, component = 'h1', children: text }) {
  const { delay } = useContext(AppContext)
  const [generatedText, setGeneratedText] = useState('')
  const [cursor, setCursor] = useState(false)

  // METHODS
  const startTyping = async () => {
    for (const letter of text) {
      setGeneratedText((prev) => prev + letter)
      const spaceChar = letter === ' '
      const random = Math.random() > 0.9;
      if (spaceChar && random) {
        await delay(2000);
      } else {
        await delay(50);
      }
    }
  }
  const playCursor = () => {
    setInterval(() => {
      setCursor((prev) => !prev)
    }, 500)
  }
  const generateComponent = () => {
    switch (component) {
      case 'p':
        return <p>{generatedText}{cursor ? <span>_</span> : <span style={{marginLeft: '0.5px'}}>&nbsp;&nbsp;</span>}</p>
      case 'h3':
        return <h3>{generatedText}{cursor ? <span>_</span> : <span style={{marginLeft: '3.5px'}}>&nbsp;&nbsp;</span>}</h3>
      case 'h1':
      default:
        return <h1>{generatedText}{cursor ? <span>_</span> : <span style={{marginLeft: '5px'}}>&nbsp;&nbsp;</span>}</h1>
    }
  }

  useEffect(() => {
    (async () => {
      await delay(delayToType)
      startTyping()
      playCursor()
    })()
  }, [])

  return (
    generateComponent()
  )
}