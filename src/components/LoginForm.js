import React from 'react'

const LoginForm = ({
  username, // string state
  setUsername, // setState function
  password, // string state
  setPassword, // setState function
  handleLogin }) => // function to handle login
{
  return(
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value = {username} name = "Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="text" value = {password} name = "Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm