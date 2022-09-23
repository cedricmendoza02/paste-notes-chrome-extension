import React from 'react'

const NoteList = ({data, setSelected}) => {
  const handleClick = (elem) => {
    setSelected(elem)
  }

  return (
    <div>
      <ul>
        {data.length ? 
          data.map((elem, i) => 
            (<li key={i} onClick={() => handleClick(elem)} className="text-2xl rounded-md shadow-md shadow-gray-500 hover:bg-indigo-600 hover:text-white p-3">{elem.title}</li>)) :
            'List empty'}
      </ul>
      <button>Up</button>
      <button>Down</button>
    </div>
  )
}

export default NoteList