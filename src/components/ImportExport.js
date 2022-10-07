import React from 'react'

const ImportExport = () => {
  return (
    <div className="flex flex-col items-center justify-start rounded-sm mx-auto w-1/2 shadow-md h-5/6">
      <h2 className="text-3xl m-5">Import/Export</h2>
      <button className={styles.button}>Import</button>
      <button className={styles.button}>Export</button>
    </div>
  )
}

const styles = {
  button: "px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-gray-900 text-white hover:bg-white hover:text-black hover:border-2 border-black active:bg-gray-700 active:text-white m-3"
}

export default ImportExport