import React, { useState } from 'react'

// Only display title by default, then the rest if toggled
// Made first with Togglable since didn't read the exercise completely


const Blog = ({blog}) => { 
  const [displayInfo, setDisplayInfo] = useState(false)
  const onClick = () => setDisplayInfo(!displayInfo)

  const BlogInfo = (props) => {
    return(
      <div>
        <p>Author: {blog.author}</p>
        <p>Title: {blog.title}</p>
        <p>Likes: {blog.likes}</p>
        <p>URL: {blog.url}</p>
      </div>
    )
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      <div onClick={ onClick }>
       {blog.title}
      </div>
      { displayInfo ? <BlogInfo blog={blog}/> : ''}
    </div>  
  )
}

export default Blog