import React, { useState, useEffect } from 'react'
// components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
// services
import blogService from './services/blogs'
import loginService from './services/login'


/*

Don't fetch blogs bef

*/

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState([null])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const fetchBlogs = () => {
    if (user !== null) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
  }

  useEffect(fetchBlogs, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`attempting login with ${username} and ${password}`)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (err) {
      console.log(err.message)
    }
  }


  return(
    <div>
      <h1>Hi</h1>
      <LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </div>
  )

/*
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
*/
}
export default App