import React, { useContext, useState } from 'react'
import { AuthMichContext } from '../../context/AuthMich'

import './Header.scss'

//contexts
function Header() {
  const [input, setInput] = useState({})
  const { user, loggedIn, login } = useContext(AuthMichContext)


  const submit = async (e) => {
    e.preventDefault();
    if (loggedIn) return;
    await login(input.username, input.password)
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    <div className='margin header'>
      Super Awesome To-Do List
      <form onSubmit={submit}>
        <input type="text" onChange={handleChange} name="username" placeholder="Username"/>
        <input type="password" onChange={handleChange} name="password" placeholder="Password"/>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default Header