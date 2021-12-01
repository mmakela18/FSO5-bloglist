import React, { useState, useEffect } from 'react'
// components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import { SuccessBox, FailureBox } from './components/Notification'
// services
import blogService from './services/blogs'
import loginService from './services/login'
// constants
const MSG_TIMEOUT = 5000



const App = () => {
  const [blogs, setBlogs] = useState([])
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
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const fetchBlogs = () => {
    // only fetch blogs once user has been fetched
    if (user !== null) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
  }

  const addBlog = async (blogToPost) => {
    try {
      const res = await blogService.create(blogToPost)
      setBlogs(blogs.concat(res))
      displaySuccess("Blog added successfully")
    } catch(err) {
      displayFailure("Invalid credentials")
    }
  }

  // bind fetchBlogs to a change in user
  useEffect(fetchBlogs, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`attempting login with ${username} and ${password}`)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      // store user local storage
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      // save login token to blogservice
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      // display success
      displaySuccess(`Login successfull. Welcome ${user.username}`)
    } catch (err) {
      displayFailure("Invalid credentials.")
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    displaySuccess("Logged out successfully.")
  }

  // user defined -> display blogs
  if(user !== null) {
    return(
      <div>
      <SuccessBox message={success} />
      <FailureBox message={failure} />
        <PostForm addBlog={addBlog} />
        <h2>Blogs</h2>
          <p>Logged in as {user.username}</p>
          <button onClick={ () => handleLogout() } >Log out</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
      </div>
  )}

  // Only display login when user not fetched
  return(
    <div>
      <SuccessBox message={success} />
      <FailureBox message={failure} />
      <h1>Hi</h1>
      <LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </div>
  )
}
export default App