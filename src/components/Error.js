import React from 'react'

const Error = ({message}) => {
  return (
    <div>
        <p className='error' > ⚠️ {message}</p>
    </div>
  )
}

export default Error