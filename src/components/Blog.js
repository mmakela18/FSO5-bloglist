import React, { useState } from 'react'
import blogService from '../services/blogs'

// Only display title by default, then the rest if toggled
// Made first with Togglable since didn't read the exercise completely
const incrementLikes = (blog, blogs, setBlogs) => {
  console.log(blog)
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
const BlogInfo = ({blog, blogs, setBlogs}) => {
  return(
    <div>
      <p>Author: {blog.author}</p>
      <p>Title: {blog.title}</p>
      <p>Likes: {blog.likes}</p>
      <button onClick={() => incrementLikes(blog, blogs, setBlogs)}>Like</button>
      <p>URL: {blog.url}</p>
    </div>
  )
}
const SingleBlog = ({blog, blogs, setBlogs}) => {
  const [displayInfo, setDisplayInfo] = useState(false)
  const onClick = () => setDisplayInfo(!displayInfo)
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
      { displayInfo ? <BlogInfo blog={blog} blogs={blogs} setBlogs={setBlogs}/> : ''}
    </div>  
)}
// Components needs: all blogs and set function
const Blogs = ({blogs, setBlogs}) => { 
  return(
    blogs.map(blog =>
      <SingleBlog key={blog.id} setBlogs={setBlogs} blog={blog} blogs={blogs}/>
    )
  )
}

export default Blogs