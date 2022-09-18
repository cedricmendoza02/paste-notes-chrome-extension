import React from 'react'

const NoteList = ({data}) => {

  return (
    <ul>
      {data.map((elem, i) => (<li key={i}>{elem.title}</li>))}
    </ul>
  )
}

export default NoteList