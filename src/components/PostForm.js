import React, { useState }from 'react'

// state 'blogs' and its state function as arguments
const PostForm = ({ addBlog }) => {
  // states for different fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const handlePost = async (event) => {
    event.preventDefault()
    const blogToPost = {
      title: title,
      author: author
    }
    console.log(addBlog)
    addBlog(blogToPost)
    // append blogs with response
    setTitle('')
    setAuthor('')
  }

  return(
    <>
      <form onSubmit={handlePost}>
        <div>
        Title
          <input type="text" onChange={({ target }) => setTitle(target.value) }></input>
        </div>
        <div>
        Author
          <input type="text" onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default PostForm