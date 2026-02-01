import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  const inputNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(num)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.')
      setWaitingForSecond(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const inputOperator = (op) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecond(true)
    setOperator(op)
  }

  const calculate = (first, second, op) => {
    switch (op) {
      case '+': return first + second
      case '-': return first - second
      case '*': return first * second
      case '/': return second !== 0 ? first / second : 'Error'
      default: return second
    }
  }

  const performCalculation = () => {
    if (operator === null || firstOperand === null) return

    const inputValue = parseFloat(display)
    const result = calculate(firstOperand, inputValue, operator)

    setDisplay(String(result))
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear" onClick={clear}>C</button>
        <button className="operator" onClick={() => inputOperator('/')}>/</button>
        <button className="operator" onClick={() => inputOperator('*')}>*</button>
        <button className="operator" onClick={() => inputOperator('-')}>-</button>

        <button onClick={() => inputNumber('7')}>7</button>
        <button onClick={() => inputNumber('8')}>8</button>
        <button onClick={() => inputNumber('9')}>9</button>
        <button className="operator plus" onClick={() => inputOperator('+')}>+</button>

        <button onClick={() => inputNumber('4')}>4</button>
        <button onClick={() => inputNumber('5')}>5</button>
        <button onClick={() => inputNumber('6')}>6</button>
        <button className="equals" onClick={performCalculation}>=</button>

        <button onClick={() => inputNumber('1')}>1</button>
        <button onClick={() => inputNumber('2')}>2</button>
        <button onClick={() => inputNumber('3')}>3</button>

        <button className="zero" onClick={() => inputNumber('0')}>0</button>
        <button onClick={inputDecimal}>.</button>
      </div>
    </div>
  )
}

export default App
