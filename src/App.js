import React, { useState, useEffect, useRef } from 'react'
// components
import Blogs from './components/Blog'
import LoginForm from './components/LoginForm'
import NotificationBox from './components/Notification'
import Togglable from './components/Togglable'
// services
import blogService from './services/blogs'
import loginService from './services/login'
// constants
const MSG_TIMEOUT = 5000



const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // states for success and error notifications
  const [success, setSuccess] = useState(null)
  const [failure, setFailure] = useState(null)

  const displaySuccess = (message) => {
    setSuccess(message)
    setTimeout( () => {
      setSuccess(null)
    }, MSG_TIMEOUT)
  }
  const displayFailure = (message) => {
    setFailure(message)
    setTimeout( () => {
      setFailure(null)
    }, MSG_TIMEOUT)
  }
  // check if there's already a login
  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`attempting login with ${username} and ${password}`)
    try {
      const user = await loginService.login({ username, password })
      if (user !== null) {
        setUser(user)
        // store user local storage
        window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
        )
        // save login token to blogservice
        blogService.setToken(user.token)
      }
      setUsername('')
      setPassword('')
      // display success
      displaySuccess(`Login successfull. Welcome ${user.username}`)
    } catch (err) {
      if (err.message === 'user is null') {
        displayFailure('Invalid credentials.')
      } else {
        displayFailure(err.message)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    displaySuccess('Logged out successfully.')
  }
  const blogsRef = useRef()
  useEffect( () => {
    console.log(blogsRef)
  }, [])
  // user defined -> display blogs
  if(user !== null) {
    return(
      <div key='user logged in'>
        <NotificationBox key='success' msg={success} msgClass='success'/>
        <NotificationBox key='failure' msg={failure} msgClass='failure' />
        <h2 key='header two'>Blogs</h2>
        <p key='login'>Logged in as {user.username}</p>
        <button key='logout' onClick={ () => handleLogout() } >Log out</button>
        <Blogs key='pleaaaase' ref={blogsRef}/>
      </div>
    )}

  // Only display login when user not fetched
  return(
    <div key='user not logged in'>
      <NotificationBox key='loginSuccess' msg={success} msgClass='success'/>
      <NotificationBox key='loginFailure' msg={failure} msgClass='failure'/>
      <h1>Hi</h1>
      <Togglable key='LoginFormTogglable' showLabel="Login" hideLabel="Cancel">
        <LoginForm username={username} setUsername={setUsername}
          password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </Togglable>
    </div>
  )
}
export default App