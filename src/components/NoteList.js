import React from 'react'

const NoteList = ({data, setSelected}) => {
  const handleClick = (elem) => {
    setSelected(elem)
  }

  return (
    <div>
      <h2 className="text-3xl">Notes list</h2>
      <ul>
        {data.length ? 
          data.map((elem, i) => 
            (<li key={i} onClick={() => handleClick(elem)} className="text-2xl rounded-md shadow-md shadow-gray-500 hover:bg-indigo-600 hover:text-white p-3">{elem.title}</li>)) :
            ''}
      </ul>
    </div>
  )
}

export default NoteList