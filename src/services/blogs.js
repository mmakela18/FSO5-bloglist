import axios from 'axios'
const baseUrl = '/api/blogs'

let userToken = null

const setToken = newToken => {
  userToken = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {
    'Authorization': userToken
    }
  }
  const request = axios.get(baseUrl, config)

  return request.then(response => response.data)
}

const blogService = {
  getAll,
  setToken
}

export default blogService