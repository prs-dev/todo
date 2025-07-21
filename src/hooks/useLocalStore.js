import { useEffect, useState } from "react";

const useLocalStore = (key, defualtValue='') => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key)
        if(storedValue){
            return JSON.parse(storedValue)
        } 
        return defualtValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}

export default useLocalStore