import React from 'react'

const Label = ({name}) => {
  return (
    <label htmlFor={name} className="first-letter:uppercase text-3xl">{name}:</label>
  )
}

export default Label