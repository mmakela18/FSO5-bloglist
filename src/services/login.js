import axios from 'axios'

const baseUrl = '/api/login'

// Handle login attempt
const login = async credentials => {
  try {
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (err) {
    console.log(err.name)
    // Return null so user stays as null in App.js
    return null
  }
}

const loginService = {
  login
}

export default loginService