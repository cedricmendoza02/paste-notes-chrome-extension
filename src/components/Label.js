import React from 'react'

const Label = ({name}) => {
  return (
    <label for={name} className="first-letter:uppercase">{name}:</label>
  )
}

export default Label