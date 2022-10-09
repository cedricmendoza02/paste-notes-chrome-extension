import React, { useState, useEffect } from 'react';
import Options from './Options';
import Card from './Card';
import Navigation from './Navigation';
import About from './About';
import ImportExport from './ImportExport';
import Contact from './Contact';

const App = () => {
  const [page, setPage] = useState('Home')
  const [list, setList] = useState([])

  useEffect(() => {
    chrome.storage.sync.get(null, res => {
      if(!res.data) {
        setList([])
      } else {
        setList(res.data)
      }
    })
  }, [])

  const updateList = (newList) => {
    setList(newList)
  }

  let pages = {
    "Home": <Options list={list} setList={updateList}/>,
    "About": <About />,
    "Import/Export": <ImportExport updateList={updateList}/>,
    "Contact": <Contact />
  }

  const changePage = (e) => {
    setPage(e.target.innerText)
  }
  
  return (
    <Card>
      <Navigation 
        handleClick={changePage}/>
      {pages[page]}
    </Card>
    
  )
}

export default App