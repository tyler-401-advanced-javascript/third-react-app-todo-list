import React, { createContext, useState, useEffect } from 'react'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'

const API = 'http://localhost:3001'
const SECRET = '89(^^30nnlwW33%'

//this is the context we will latch on to.
export const AuthMichContext = createContext(null);

function AuthMich(props) {

  //hooks
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  //functions
  const setLoginState = (user, token, logged) => {
    setUser(user);
    setLoggedIn(logged)
    cookie.save('bearer', token ? token : null)
  }

  const login = async (username, password) => {
    //send the username and password to the server.
    console.log(username, password);
    try {
      const base64String = btoa(`Basic ${username}:${password}`)
      const raw = await fetch(`${API}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: base64String,
        }
      })

      const response = await raw.json();
      if (response.token) {
        console.log('success . ', response.token);
        validateToken(response.token);
      } else {
        console.error('There was no token', response)
      }

    } catch (err) {
      console.error('something wrong with the request', err)
    }
  }

  const validateToken = async (token) => {
    try {
      const user = await jwt.verify(token, SECRET)
      setLoginState(user, token, true)
    } catch (err) {
      setLoginState({}, null, false)
      console.error('Token signature invalid')
    }
  }

  const logout = () => {
    setLoginState({}, null, false);
  }

  useEffect(() => {
    //figure out how to use useEffect() to parse the cookie and set the user if there is a cookie. 
    //only do these things, if the logginstate is false. That way we prevent infinity cookie-gets causing mass confusion and chip-burning mayhem olay
    if (!loggedIn) {
      const token = cookie.load('bearer');
      if (token) validateToken(token) 
    }
  })

  return (
    //these values are where we put in acutal destructurable items for use in the context.
    <AuthMichContext.Provider value={{ loggedIn, user, login, logout }}>
      {props.children}
    </AuthMichContext.Provider>
  )
}

export default AuthMich