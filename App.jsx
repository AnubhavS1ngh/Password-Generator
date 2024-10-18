import { useEffect } from 'react';
import { useState, useCallback, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numAll, setnumAll] = useState(false);
  const [charAll, setcharAll] = useState(false);
  const [pass, setPass] = useState("");
  const [click, setClick ] = useState(false);
  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = (useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAll){
      str = str + "0123456789"
    }
    if(charAll){
      str = str + "!@#$%^&*()_+=-~"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); 
      pass = pass + str.charAt(char);
    }
    setPass(pass);
  },[length, numAll, charAll, setPass]));

  const copyPassToCLipboard = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(pass);
    setClick(true);
    setTimeout(() => {
      setClick(false)
    }, 400);
  },
  [pass])

  useEffect(()=>{passwordGenerator()}, [
    length, numAll, charAll, passwordGenerator
  ])
  return (
  <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4  bg-gray-900"> 
      <div className="bg-white rounded-lg w-fit mx-auto px-4 justify-center">
        <h1 className='text-center text-l mb-1 text-red-400'>Password Generator</h1>
      </div>
      <div className="flex  shadow-sm overflow-hidden rounded-md gap-1 m-1 mt-3">
        <input 
          type="text"
          value={pass}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef} />

            <button 
              onClick = {copyPassToCLipboard} 
              className= {`flex p-1 text-white ${click ? 'bg-green-300': 'bg-blue-500'}`}>
              {click ? 'Copied!' : 'Copy'}</button>
      </div>
      <div className="flex gap-x-1 mt-3 justify-evenly">
        <div className="flex items-center gap-x-1 bg-white rounded-md  px-1">
          <input 
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value)
            }} />
            <label htmlFor="" className='text-red-400 flex flex-auto'>length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1 bg-white rounded-md px-1">
          <input 
          type="checkbox"
          defaultChecked={numAll}
          id='numInput'
          onChange={(e)=>{
            setnumAll((prev) => !prev)
          }}
          />
          <label htmlFor="" className='text-red-400 flex flex-auto'>Numbers</label>
        </div>

        <div className="flex items-center gap-x-1 bg-white rounded-md px-1">
          <input type="checkbox"
          defaultChecked = {charAll}
          id='charInput'
          onChange={(e)=>{
            setcharAll ((prev) => !prev)
          }}  
          />
          <label htmlFor="" className='text-red-400 flex flex-auto'>Characters</label>
        </div>
      </div>  
    </div>
  </>
    )
}

export default App
