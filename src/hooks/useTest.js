import { useState, useEffect } from "react";

const useTest = (key, defaultValue='') => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        if(stored === null) {
            return defaultValue
        } else {
            return JSON.parse(stored)
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}

export default useTest