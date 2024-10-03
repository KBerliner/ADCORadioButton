import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [buttonNames, setButtonNames] = useState({});
  const [buttonNameInput, setButtonNameInput] = useState("");
  const [buttonOptionInput, setButtonOptionInput] = useState("");
  const [differentOptions, setDifferentOptions] = useState(false);
  const [result, setResult] = useState([]);

  const removeButton = (button) => {
    const buttons = {...buttonNames};

    if (buttons[button]) {
      delete buttons[button];
    }

    setButtonNames(buttons);
  }

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const submitButton = (e) => {
    e.preventDefault();

    const newButtonNames = {...buttonNames};
    differentOptions ? newButtonNames[buttonNameInput] = buttonOptionInput : newButtonNames[buttonNameInput] = buttonNameInput;

    console.log(newButtonNames)

    setButtonNames(newButtonNames);
    setButtonNameInput("");
    setButtonOptionInput("");
  }

  const generateCode = () => {
    return Object.keys(buttonNames).map((button, index) => {
      return calculateFinalCodeForButton(button, index);
    })
  }

  const calculateFinalCodeForButton = (button, buttonIndex) => {
    return (
      `${Object.keys(buttonNames).map((button, index) => {
        return (`var ${alphabet[index]} = this.getField(\"${button}\");`)
      }).join('\n')}
      \n
      if (${alphabet[buttonIndex]}.value = \"${buttonNames[button]}\")  {
        ${Object.keys(buttonNames).map((button, index) => {
          if (index !== buttonIndex) {
            return (`${alphabet[index]}.value = \"Off\";`)
          }
        }).join('\n')}
      }`
    )
  }

  return (
    <div className="flex flex-col content-center flex-wrap w-2/3 mx-auto text-center">
      <h1 className="underline text-3xl mb-6">
        Make the Radio Button Code
      </h1>
      <div className="buttonList">
        <ul className="flex flex-wrap">
          {Object.keys(buttonNames).map(button => {return (
            <li key={buttonNames[button]} className={"flex bg-gray-200 py-1 px-2 mx-3 my-2 rounded justify-between"}>
              <div>{buttonNames[button]}</div>
              <button onClick={() => removeButton(button)} className="cursor-pointer text-red-700 ml-2">x</button>
            </li>
          )})}
        </ul>

      </div>
      <form className="input flex flex-col w-full space-y-2" onSubmit={submitButton}>
          <label htmlFor="buttonNameInput">Input your button Names</label>
          <input className="border-2 border-black rounded-lg" value={buttonNameInput} onChange={({ target }) => setButtonNameInput(target.value)} name="buttonNameInput" type="text"></input>
          {differentOptions && (
            <>
              <label htmlFor="buttonOptionInput">Input your button Options</label>
              <input className="border-2 border-black rounded-lg" value={buttonOptionInput} onChange={({ target }) => setButtonOptionInput(target.value)} name="buttonOptionInput" type="text"></input>
            </>
          )}
          {
          differentOptions ? 
          buttonNameInput && buttonOptionInput && <input className="text-white text-3xl cursor-pointer rounded-3xl border-1 border-black bg-blue-600 max-w-12" type="submit" value="+"></input>
          :
          buttonNameInput && <input className="text-white text-3xl cursor-pointer rounded-3xl border-1 border-black bg-blue-600 max-w-12" type="submit" value="+"></input>
          }
      </form>
      <div className="result">
          <button className="w-1/2 bg-green-200 rounded-full my-2 py-4 mx-auto" onClick={() => setResult(generateCode())}>Generate Code!</button>
          <hr></hr>
          <ul className="flex flex-wrap">
            {result.length > 0 && Object.keys(buttonNames).map((button, index) => {
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
      <div>
        <label htmlFor="differentOptions">Are your button names different than the button's options?</label>
        <input value={differentOptions} onChange={() => setDifferentOptions(!differentOptions)} className="mx-2" name="differentOptions" type="checkbox"></input>
      </div>
    </div>
  )
}

export default App
