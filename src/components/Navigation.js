import React from 'react'

const Navigation = ({handleClick}) => {
  return (
    <div className="flex justify-around my-4">
      <h1 className="text-4xl">Paste Notes</h1>
      <ul onClick={(e) => handleClick(e)} className="flex">
          <li className={styles.buttons}>Home</li>
          <li className={styles.buttons}>Import/Export</li>
          <li className={styles.buttons}>About</li>
          <li className={styles.buttons}>Contact</li>
      </ul>
    </div>
  )
}

const styles = {
  buttons: "px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-900 hover:text-white active:bg-gray-700"
}

export default Navigation