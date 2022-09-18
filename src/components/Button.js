import React from 'react'

const Button = ({name, saveNote}) => {
  const handleClick = (e) => {
    e.preventDefault();
    saveNote()
  }
  return (
    <button 
      onClick={handleClick}
      className="m-1 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{name}</button>
  )
}

export default Button