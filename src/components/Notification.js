import React from 'react'

// Show a notification, with or without classname
const NotificationBox = ({msg, msgClass}) => {
  if (msg === null) {
    return null
  }
  return(
    <div className={`${msgClass}`}>
      {msg}
    </div>
  )
}

export default NotificationBox
