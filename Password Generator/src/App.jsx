import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setlength] = useState(5)
  const [useNumber, setuseNumber] = useState(false)
  const [useCharacter, setuseCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const generatePasword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (useNumber) { str += "0123456789" }
    if (useCharacter) { str += "`~!@#$%^&*?<>[]{}" }
    for (let i = 1; i <= length; i++) {
      let pos = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(pos)
    }
    setPassword(pass)
  }, [length, useNumber, useCharacter])

  useEffect(()=>{
    generatePasword()
  },[length, useNumber, useCharacter, generatePasword])

  // useRef hook
  const passwordRef = useRef(null)

  const copyToClip = useCallback(()=>{
    passwordRef.current?.select()
   // passwordRef.current?.setSelectionRange(0,5)  //No matter what is the length of your password it will only select n characters(setSelectionRange(0,n))
    window.navigator.clipboard.writeText(password)
  },[password])
  
  return (
    <>

      <div className='max-w-lg w-full mx-auto rounded-lg text-center px-4 pb-4 my-4 text-orange-600 bg-gray-600' >
        <h1 className='text-3xl text-center text-white py-5'>Password Generator</h1>
        <div className='flex rounded-lg mb-4 overflow-hidden'>
          <input type='text' value={password} className='outline-none w-full px-2 py-2 mb-4 rounded-lg' readOnly ref={passwordRef}  placeholder='password'></input>
          <button className='bg-blue-700 text-white outline-none mb-4 rounded-lg px-2 py-2' onClick={copyToClip}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-5'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={5} max={30} value={length} className='cursor-pointer' onChange={(e) => { setlength(e.target.value) }}></input>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={useNumber} id='numberInput' onChange={() => {
              setuseNumber((prev) => !prev)
            }} />
            <label>Include Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={useCharacter} id='characterInput' onChange={() => {
              setuseCharacter((prev) => !prev)
            }} />
            <label>Include Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
