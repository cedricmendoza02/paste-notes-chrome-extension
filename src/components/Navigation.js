import React from 'react'

const Navigation = ({handleClick, pages}) => {

  return (
    <div className="flex justify-around my-4">
      <h1 className="text-4xl">Paste Notes</h1>
      <ul onClick={(e) => handleClick(e)} className="flex">
          {Object.keys(pages).map((elem, i) => <li key={i} className={styles.buttons}>{elem}</li>)}
      </ul>
    </div>
  )
}

const styles = {
  buttons: "px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-900 hover:text-white active:bg-gray-700"
}

export default Navigation