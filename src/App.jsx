import { useState, useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "@#$%&"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass+= str.charAt(char);

    }
    setPassword(pass)

  }, [length, numAllowed,
    charAllowed, setPassword])

    const copyPassword=useCallback(()=>{
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0,12);
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{passwordGenerator()},
    [length,numAllowed,charAllowed,setPassword])

    const passwordRef=useRef(null)

  return (
    <>
      {/* taking position */}
      <div className='w-full max-w-md mx-auto rounded-lg
      px-4 py-5 my-8 text-orange-500 bg-gray-700'
      >
        <h1 className='text-white text-center'>Password Generator</h1>

        {/* taking input box in that position */}
        <div className='flex shadow rounded-lg 
        overflow-hidden mb-4 mt-3'>

          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef} />

          <button onClick={copyPassword}
            className='outline-none bg-blue-700
          text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)

              }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)

              }} />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
