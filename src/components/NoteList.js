import React from 'react'
import ListItem from './ListItem'

const NoteList = ({data, setSelected, selected, moveUp, moveDown}) => {
  const handleClick = (evt, elem) => {
    setSelected(elem)
  }

  return (
    <div>
      <ul>
        {data.length ? 
          data.map((elem, i) => 
            (<ListItem 
                key={i}
                selected={selected === i}
                onClick={evt => handleClick(evt, elem)}
                title={elem.title} />)) : 'List empty'}
      </ul>
      <div className="grid grid-cols-2">
        <button   
          onClick={moveUp}
          className="bg-gray-100 m-1 p-1 inline-flex justify-center rounded-md border-b-4 border-indigo-500 hover:bg-indigo-500 transition duration-100 ease out hover:ease-in hover:text-white">
          Move up</button>
        <button 
          onClick={moveDown}
          className="bg-gray-100 m-1 p-1 inline-flex justify-center rounded-md border-t-4 border-indigo-500 hover:bg-indigo-500 transition duration-100 ease out hover:ease-in hover:text-white">
            Move Down</button>
      </div>
    </div>
  )
}

export default NoteList