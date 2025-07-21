import { useState, useEffect } from "react"

const useLocalStorage = (key, defaultValue) => {
  // Step 1: Initialize state with localStorage value if available
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : defaultValue
    } catch (error) {
      console.error("Error reading localStorage key:", key)
      return defaultValue
    }
  })

  // Step 2: Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error writing to localStorage key:", key)
    }
  }, [key, value])

  // Step 3: Return just like useState
  return [value, setValue]
}

export default useLocalStorage
