import React from 'react'
import { useState } from 'react'


const Content = () => {
    const [name,setName] = useState('Vigs')
    const [count,setCount] = useState(0)
    const handleChange  =  () => {
        const names = ['Vigs','Karu','Gayu']
        const val = Math.floor(Math.random() * 3)
        setName(names[val])
      }

    const handleClick =  () => {
        setCount(count+1)
        console.log(count);
    }
  return (
    <main>
        <p>
         Hello {name}!
        </p>

       <button onClick={handleChange}>Click Me! </button>
       <button onClick={handleClick}>Click Me! </button>
       <button className='change' >Click Me! </button>
    </main>
  )
}

export default Content