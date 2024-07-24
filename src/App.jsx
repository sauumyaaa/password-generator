import { useRef,useCallback,useEffect,useState } from 'react'



function App() {

  const [length,setLength]=useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("")
  //kisi bhi chij ka reference lene ke lie useRef hook kam aata hai
  const passwordRef=useRef(null)

  
  //useCallback is only for optimization
  //is memoizes the function 
  const passwordGenerator=useCallback(()=>{

     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numAllowed)str+="0123456789"
     if(charAllowed) str+="!@#$%&*{}[]()~"
     
     for (let i=1;i<=length;i++){

      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
     }
    
     setPassword(pass )

  },[length,numAllowed,charAllowed])


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    //wo copy wala blue effect dene ke lie
    passwordRef.current?.setSelectionRange(0,20)
    //max itne char select honge (copy honge)
    window.navigator.clipboard.writeText(password)
  }
  ,[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])
  //if there is any change in any of the dependencies, function runs 
  //take password as dependency and see the infinite loop

  return (
    <>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-lg text-center text-white my-3'>PASSWORD GENERATOR</h1>
    <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
      <input
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      ></input>
      <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={6}
        max={30}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>length: {length}</label>

      </div>

      <div className='flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={numAllowed}
        id="numberInput"
        onChange={()=>{
          setNumAllowed((prev)=>!prev);
        }}
        
        ></input>
        <label htmlFor='numberInput'>Numbers?</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={()=>{
          setCharAllowed((prev)=>
          !prev);
        }}
        ></input>
        <label htmlFor='characterInput'>Characters?</label>
      </div>
    </div>
    </div>
   
    </>
  )
}

export default App
