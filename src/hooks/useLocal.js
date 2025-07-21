import {useState, useEffect} from 'react'

const useLocal = (key, defaultValue='') => {
  const [value, setValue] = useState(() => {
    const alreadyExists = localStorage.getItem(key)
    if(!alreadyExists) return defaultValue
    return JSON.parse(alreadyExists)
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export default useLocal