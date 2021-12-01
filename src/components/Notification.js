import React from 'react'

const SuccessBox = ({message}) => {
  if (message === null) {
    return null
  }
  return(
    <div className="success">
      {message}
    </div>
  )
}

const FailureBox = ({message}) => {
  if (message === null) {
    return null
  }
  return(
    <div className="failure">
      {message}
    </div>
  )
}

export {
  SuccessBox,
  FailureBox
}