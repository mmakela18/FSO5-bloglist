import React, { useState } from 'react'
import blogService from '../services/blogs'

// Only display title by default, then the rest if toggled
// Made first with Togglable since didn't read the exercise completely

// Components needs: individual blog, all blogs and set function
const Blog = ({blog, blogs, setBlogs}) => { 
  const [displayInfo, setDisplayInfo] = useState(false)
  const onClick = () => setDisplayInfo(!displayInfo)
  const incrementLikes = () => {
    const newLikes = blog.likes + 1
    // new blog-object
    const updatedBlog = {...blog, likes: newLikes}
    blogService.update(updatedBlog)
    // still need to update local blogs
    const newBlogs = blogs.map(
      blog => {
        if (blog.id === updatedBlog.id) {
          blog.likes = blog.likes + 1
        }
        return blog
      }
    )
    setBlogs(newBlogs)
  }
  const BlogInfo = (props) => {
    return(
      <div>
        <p>Author: {blog.author}</p>
        <p>Title: {blog.title}</p>
        <p>Likes: {blog.likes}</p>
        <button onClick={incrementLikes}>Like</button>
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