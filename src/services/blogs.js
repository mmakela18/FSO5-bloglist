import axios from 'axios'
const baseUrl = '/api/blogs'

let userToken = null

const setToken = newToken => {
  userToken = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
    'Authorization': userToken
    }
  }
  const response = await axios.get(baseUrl, config)

  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {
      'Authorization': userToken
    }
  }
  try {
    console.log(newBlog)
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch(err) {
    console.log(err.message)
  }
}

const blogService = {
  getAll,
  create,
  setToken
}

export default blogService