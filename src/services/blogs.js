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

const update = async(blogToUpdate) => {
  try {
    console.log(blogToUpdate)
    const config = {
      headers: {
        'Authorization': userToken
      }
    }
    console.log(config)
    console.log(blogToUpdate.id)
    const res = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
    return res
  } catch (err) {
    console.log(err.message)
  }
}

const remove = async(blogToDelete) => {
  try {
    console.log(`removing ${blogToDelete.id}`)
    const config = {
      headers: {
        'Authorization': userToken
      }
    }
    const res = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
    return res
  } catch (err) {
    console.log(err.message)
  }
}

const blogService = {
  getAll,
  create,
  update,
  remove,
  setToken
}

export default blogService