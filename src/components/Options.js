import React, { useEffect, useState } from 'react'
import Button from './Button';
import Label from './Label';
import NoteList from './NoteList';

const getData = () => {
  return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (res) => resolve(res))
  })
}

const Options = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [list, setList] = useState([])

  useEffect(async () => {
    const response = await getData()
    console.log(response.data)
    setList(response.data)
  }, [])

  const handleChange = (e, update) => {
    update(e.target.value)
  }

  const saveNote = () => {
    chrome.runtime.sendMessage({method: 'POST', data: {title, contents}}, function(response) { // send message to background script
      console.log(response)
      setList(response.res.data)
    })
    clearFields()
  }

  const clearFields = () => {
    setTitle('')
    setContents('')
  }

  return (
    <div className="grid grid-cols-2 container mx-auto p-4 shadow-2xl mt-10 max-w-7xl text-2xl">
      <h1 className="col-span-full text-3xl font-medium m-3">Notes App</h1>
      <div className="text-lg">
        <NoteList 
          data={list}/>
      </div>
      <form className="flex flex-col">
        <Label name="title" />
          <input 
            className="p-2"
            type="text" 
            placeholder="Input note title here..." 
            name="title" 
            id="title" 
            value={title}
            onChange={(e) => handleChange(e, setTitle)}/>
          <Label name="contents" />
          <textarea 
            rows={15}
            className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            name="contents"
            id="contents"
            placeholder="Input note body here"
            onChange={(e) => handleChange(e, setContents)}
            value={contents}></textarea>
          <Button name="Save" saveNote={saveNote}/>
          <Button name="Remove" />
      </form>
    </div>
  )
}

export default Options