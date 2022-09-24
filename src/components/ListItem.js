import React from 'react'

const ListItem = ({selected, onClick, title}) => {
  return (
    <li onClick={onClick}
        className={`text-2xl rounded-md shadow-md shadow-gray-500 hover:bg-indigo-600 hover:text-white p-3 ${selected ? 'bg-indigo-300' : ''}`}>
        {title}
    </li>
  )
}

export default ListItem