import React, { useEffect, useState } from 'react'
import Label from './Label';
import NoteList from './NoteList';

const Options = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [list, setList] = useState([{title: "Hello", contents: "Caleb"}])
  const [searchIndex, setSearchIndex] = useState(-1)

  // useEffect(() => {
  //   chrome.storage.sync.get(null, res => {
  //     if(!res.data) {
  //       setList([])
  //     } else {
  //       setList(res.data)
  //     }
  //   })
  // }, [])

  useEffect(() => {
    setSearchIndex(list.findIndex((elem) => elem.title === title))
  }, [title])

  useEffect(() => {
    if(list.length === 0) return
    if(searchIndex < 0) return
    setTitle(list[searchIndex].title)
    setContents(list[searchIndex].contents)
  }, [searchIndex])

  const moveUp = () => {
    chrome.runtime.sendMessage({method: 'move-up', data: searchIndex}, response => {
      console.log(response)
      setSearchIndex(response.newIndex)
      setList(response.res.data)
    })
  }

  const moveDown = () => {
    chrome.runtime.sendMessage({method: 'move-down', data: searchIndex}, response => {
      console.log(response)
      setSearchIndex(response.newIndex)
      setList(response.res.data)
    })
  }

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
    <div className="grid grid-cols-2 gap-5">
      <NoteList 
        moveUp={moveUp}
        moveDown={moveDown}
        setSelected={selectItem}
        selected={searchIndex}
        data={list} />
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
  saveBtn: "bg-gray-100 m-1 p-1 inline-flex justify-center rounded-md border-b-4 border-indigo-500 text-sm font-medium hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-100 ease-out hover:ease-in",
  removeBtn: "bg-gray-100 m-1 p-1 inline-flex justify-center rounded-md border-b-4 border-red-500 text-sm font-medium hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-100 ease-out hover:ease-in"
}

export default Options