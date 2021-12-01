import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (userToken) => {
  const request = axios.get(baseUrl,
    { headers:
      {
        'Authorization': `bearer ${userToken}`
      }
    }
  )

  return request.then(response => response.data)
}

export default { getAll }