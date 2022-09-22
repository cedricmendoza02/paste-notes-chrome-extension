import React, { useEffect, useState } from 'react'
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
    if(title === '') {
      alert('Title cannot be empty')
      return
    }
    chrome.runtime.sendMessage({'method': 'POST', 'data': {title, contents}}, function(response) { // send message to background script
      console.log(response)
      setList(response.res.data)
    })
    clearFields()
  }

  const removeNote = () => {
    chrome.runtime.sendMessage({method: 'DELETE', data: {title, contents}}, function(response) { // send message to background script
      console.log(response)
      if(response.res.data.length === 0) {
        setList([])
        return
      }
      setList(response.res.data)
    })
    clearFields()
  }

  const selectItem = (item) => {
    setTitle(item.title)
    setContents(item.contents)
  }

  const clearFields = () => {
    setTitle('')
    setContents('')
  }

  return (
    <div className="grid grid-cols-[300px_minmax(500px,_1fr)_100px] gap-3 container mx-auto p-4 shadow-2xl mt-10 max-w-7xl text-2xl">
      <h1 className="col-span-full text-5xl font-medium m-3">Notes</h1>
      <div className="text-lg">
        <NoteList 
          data={list}
          setSelected={selectItem}/>
      </div>
      <form className="flex flex-col">
        <Label name="title" />
          <input 
            className="p-2 text-2xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="text" 
            placeholder="Input note title here..." 
            name="title" 
            id="title" 
            value={title}
            onChange={(e) => handleChange(e, setTitle)}/>
          <Label name="contents" />
          <textarea 
            rows={15}
            className="p-2 text-2xl block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            name="contents"
            id="contents"
            placeholder="Input note body here"
            onChange={(e) => handleChange(e, setContents)}
            value={contents}></textarea>
          <button className={styles.saveBtn} onClick={saveNote}>Save</button>
          <button className={styles.removeBtn} onClick={removeNote}>Remove</button>
      </form>
    </div>
  )
}

const styles = {
  saveBtn: "m-1 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  removeBtn: "m-1 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
}

export default Options