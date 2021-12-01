import React, { useState, useEffect } from 'react'
// components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
// services
import blogService from './services/blogs'
import loginService from './services/login'


/*

Don't fetch blogs bef

*/

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    const res = await blogService.create(blogToPost)
    console.log(blogs)
    console.log(res)
    setBlogs(blogs.concat(res))
    console.log(blogs)
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
      console.log(user)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  // user defined -> display blogs
  if(user !== null) {
    return(
      <div>
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
      <h1>Hi</h1>
      <LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </div>
  )
}
export default App