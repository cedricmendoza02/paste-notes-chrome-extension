import React, { useState, useRef, useEffect } from 'react';
import Options from './Options';
import Card from './Card';
import Navigation from './Navigation';
import About from './About';
import ImportExport from './ImportExport';

const App = () => {
  const [page, setPage] = useState('Home')

  let pages = {
    "Home": <Options />,
    "About": <About />,
    "Import/Export": <ImportExport />
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