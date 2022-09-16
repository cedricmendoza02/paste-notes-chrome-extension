import React, { useState } from 'react'
import './options.scss'

const Options = () => {
  const [text, setText] = useState('');
  
  const handleChange = (e) => {
    setText(e.target.value);
  }

  return (
    <div>
      <form className="container">
        <label for="title">Title:</label>
          <input 
            type="text" 
            placeholder="Input note title here..." 
            name="title" 
            id="title" 
            value={text}
            required
            onChange={handleChange}/>
          <label for="contents">Contents:</label>
          <textarea 
            name="contents"
            id="contents"
            placeholder="Input note body here"></textarea>
          <button>Save</button>
      </form>
    </div>
  )
}

export default Options