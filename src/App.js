import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  let [password,generatePass]=useState("");
  let [range,changeRange]=useState(8);
  let [numAllow,changeNum]=useState(false);
  let [sypAllow, changeSymp]=useState(false);

  const generatePassword=useCallback(()=>{
        let out="";
        let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        if(numAllow) str+=('1234567890');
        if(sypAllow) str+=('!@#$%^&*()_');

        for(let i=0; i<range; i++){
          const char=Math.floor(Math.random() * str.length +1);
          out+=str.charAt(char);
        }
        generatePass(out);
  });

  useEffect(()=>{
      generatePassword();
  },[range, numAllow, sypAllow])

  let passwordRef=useRef(null);

  const copyToClipboard=() =>{
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select(   );
  }

  return (
    <div className="App">
      <h1>Generate Password</h1>
      <div className='box'>
        <input className='password' 
        type='text' 
        value={password}
        placeholder='password'
        readOnly>
        </input>
        <button onClick={copyToClipboard} className='copypassword'>copy</button>

         <div>
          <input type='range'
           min={6} max={20} 
           className='range' 
           value={range} onChange={(e)=> changeRange(e.target.value)} 
           ref={passwordRef}
           ></input>
          <label htmlFor='range'>Range: {range}</label>
        </div>

        <div>
          <input type='checkbox'  className='check'  name='number'
           defaultChecked={numAllow}
          onChange={()=> {
            changeNum((prev) => !prev)
          } }></input>
          <label htmlFor='number'>Number</label>
        </div>

        <div>
          <input type='checkbox'  className='check'  name='symbol'
          defaultChecked={sypAllow}
          onChange={()=> {
            changeSymp((prev) => !prev)
          } }></input>
          <label htmlFor='sympol'>Sympol</label>
        </div>

        

      </div>
    </div>
  );
}

export default App;
