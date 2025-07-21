import React, { useState } from 'react'
import useTest from './useTest'

const Test = () => {
  const [name, setName] = useTest('name', '')
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Your name is: {name}</p>
    </div>
  )
}

export default Test