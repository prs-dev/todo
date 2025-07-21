import React, { useState } from 'react'

const LoginForm = ({user, setUser}) => {
    const [userLogin, setUserLogin] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setUser(userLogin)
    }
  return (
    <div>
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" value={userLogin} onChange={e => setUserLogin(e.target.value)} />
            <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default LoginForm