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
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const fetchBlogs = () => {
    // only fetch blogs once user has been fetched
    if (user !== null) {
      blogService.getAll(user.token).then(blogs => {
        setBlogs(blogs)
      })
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
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (err) {
      console.log(err.message)
    }
  }

  // Only display login when user not fetched
  if(user === null) {
    return(
      <div>
        <h1>Hi</h1>
        <LoginForm username={username} setUsername={setUsername}
          password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
    )
  }
  // user defined -> display blogs
  return(
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
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