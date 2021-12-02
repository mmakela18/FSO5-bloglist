import React from 'react'
import Togglable from './Togglable'

// Only display title by default, then the rest if toggled
// newlines ugly, dunno yet how really should
const Blog = ({blog}) => (
  <div>
    {blog.title}
    <Togglable showLabel = "View" hideLabel= "Hide">
    <p>Author: {blog.author}</p>
    <p>Title: {blog.title}</p>
    <p>Likes: {blog.likes}</p>
    <p>URL: {blog.url}</p>
    </Togglable>
  </div>  
)

export default Blog