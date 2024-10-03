import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [buttonNames, setButtonNames] = useState([]);
  const [buttonNameInput, setButtonNameInput] = useState("");
  const [result, setResult] = useState([]);

  const removeButton = (button) => {
    const buttons = [...buttonNames];

    const index = buttonNames.indexOf(button);
    if (index > -1) {
      buttons.splice(index, 1);
    }
    setButtonNames(buttons);
  }

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const submitButton = (e) => {
    e.preventDefault();

    setButtonNames([...buttonNames, buttonNameInput]);
    setButtonNameInput("");
  }

  const generateCode = () => {
    console.log('FINAL', result);
    return buttonNames.map((button, index) => {
      return calculateFinalCodeForButton(index);
    })
  }

  const calculateFinalCodeForButton = (buttonIndex) => {
    return (
      `${buttonNames.map((button, index) => {
        return (`var ${alphabet[index]} = this.getField(\"${button}\");`)
      }).join('\n')}
      \n
      if (${alphabet[buttonIndex]}.value = \"${buttonNames[buttonIndex]}\")  {
        ${buttonNames.map((button, index) => {
          if (index !== buttonIndex) {
            return (`${alphabet[index]}.value = \"Off\";`)
          }
        }).join('\n')}
      }`
    )
  }

  return (
    <div className="flex flex-col content-center flex-wrap w-2/3 mx-auto">
      <h1 className="underline text-3xl mb-6">
        Make the Radio Button Code
      </h1>
      <div className="buttonList">
        <ul className="flex flex-wrap">
          {buttonNames.map(button => {return (
            <li key={button} className={"flex bg-gray-200 py-1 px-2 mx-3 my-2 rounded justify-between"}>
              <div>{button}</div>
              <div onClick={() => removeButton(button)} className="cursor-pointer text-red-700 ml-2">x</div>
            </li>
          )})}
        </ul>

      </div>
      <form className="input flex flex-col w-full space-y-2" onSubmit={submitButton}>
          <label htmlFor="buttonNameInput">Input your button Names</label>
          <input className="border-2 border-black rounded-lg" value={buttonNameInput} onChange={({ target }) => setButtonNameInput(target.value)} name="buttonNameInput" type="text"></input>
          {buttonNameInput && <input className="text-white text-3xl cursor-pointer rounded-3xl border-1 border-black bg-blue-600 max-w-12" type="submit" value="+"></input>}
      </form>
      <div className="result">
          <button onClick={() => setResult(generateCode())}>Generate Code!</button>
          <hr></hr>
          <ul className="flex flex-wrap">
            {result.length > 0 && buttonNames.map((button, index) => {
              return (
                <li key={index} className="w-72 mx-4 my-3 bg-gray-200 p-2 rounded">
                  <span className="flex justify-between">
                    <h2 className="text-lg mb-2">{`Code for button: ${button}`}</h2>
                    <button className="text-sm" onClick={() => navigator.clipboard.writeText(result[index])}>Copy</button>
                  </span>
                  
                  <p>{result[index]}</p>
                </li>
              )
            })}
          </ul>
      </div>
    </div>
  )
}

export default App
