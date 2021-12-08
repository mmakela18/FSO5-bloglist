import React, { useState, useEffect, useImperativeHandle } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PostForm from './PostForm'

// Only display title by default, then the rest if toggled
// Made first with Togglable since didn't read the exercise completely
const incrementLikes = (blog, blogs, setBlogs) => {
  console.log(blog)
  const newLikes = blog.likes + 1
  // new blog-object
  const updatedBlog = { ...blog, likes: newLikes }
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
const BlogInfo = ({ blog, blogs, setBlogs }) => {
  return(
    <div key={`im beggin ${blog.id}`}>
      <p key={`beggin ${blog.id}`}>Author: {blog.author}</p>
      <p key={`youu ${blog.id}`}>Title: {blog.title}</p>
      <p key={`plsease ${blog.id}`}>Likes: {blog.likes}</p>
      <button key={`whyyyy ${blogs.id}`} onClick={() => incrementLikes(blog, blogs, setBlogs)}>Like</button>
      <p key={`beegin youuuu ${blogs.id}`}>URL: {blog.url}</p>
    </div>
  )
}
const SingleBlog = ({ blog, blogs, setBlogs, removeBlog }) => {
  const [displayInfo, setDisplayInfo] = useState(false)
  const onClick = () => setDisplayInfo(!displayInfo)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // Generate a kind of unique key to silence warnings
  // Since there can only be only BlogInfo child per SingleBlog this shouldn't be that bad
  const key = `${blog.id} BlogInfo`
  return(
    <div key={key} style={blogStyle}>
      <div key={`cmon ${key}`} onClick={ onClick }>
        {blog.title}
      </div>
      { displayInfo ? <BlogInfo key={`pls ${key}`} blog={blog} blogs={blogs} setBlogs={setBlogs}/> : ''}
      <button onClick={() => removeBlog(blog)}>Delete</button>
    </div>
  )}
// Components needs: all blogs and set function
const Blogs = React.forwardRef((props, ref) => {
  const [blogs, setBlogs] = useState([{}])
  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  useEffect(fetchBlogs, [])
  const addBlog = async (blogToPost) => {
    try {
      const res = await blogService.create(blogToPost)
      setBlogs(blogs.concat(res))
    } catch(err) {
      console.log(err.message)
    }
  }
  useImperativeHandle(ref, () => {
    console.log('imperative handle here')
    return {
      addBlog
    }
  })
  const removeBlog = async (blogToRemove) => {
    const res = await blogService.remove(blogToRemove)
    console.log(res)
    setBlogs(blogs.filter( (blog) => blog.id !== blogToRemove.id))
  }
  return(
    <div>
      {blogs.sort( (a, b) => (b.likes - a.likes))
        .map(blog => <SingleBlog removeBlog={removeBlog} key={blog.id} setBlogs={setBlogs} blog={blog} blogs={blogs}/>)}
      <Togglable key='PostFormTogglable' showLabel="Add new" hideLabel="Cancel">
        <PostForm key='PostForm' addBlog={addBlog} />
      </Togglable>
    </div>
  )
})

Blogs.displayName = 'Blogs'

export default Blogs