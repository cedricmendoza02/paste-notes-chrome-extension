import React, {useRef} from 'react'

const ImportExport = ({list, updateList}) => {
  const uploadValue = useRef()

  const download = () => {
    chrome.storage.sync.get(null, res => {
      let blob = new Blob([JSON.stringify(res)], {type: "application/json"})
      let url = window.URL.createObjectURL(blob)
      chrome.runtime.sendMessage({method: 'download', data: url}, () => {
        window.URL.revokeObjectURL(url)
      })
    })
  }

  const upload = async () => {
    let bb = new Blob([uploadValue.current.files[0]], {type: "application/json"})
    let contents = await bb.text()
    contents = JSON.parse(contents)
    chrome.runtime.sendMessage({method: 'upload', data: contents}, (res) => {
      console.log(res.message)
      console.log(contents)
      updateList(contents.data)
      uploadValue.current.value = ''
    })
  }

  return (
    <div className="flex flex-col items-center justify-start rounded-sm mx-auto w-1/2 shadow-md h-5/6">
      <h2 className="text-3xl m-5">Import/Export</h2>
      <form>
        <label htmlFor="import" className={styles.button}>Import</label>
        <input style={{display: "none"}} onChange={upload} ref={uploadValue} type="file" accept="application/json" id="import" />
        <button onClick={download}className={styles.button}>Export</button>
      </form>
      
      <h3 className="text-2xl m-3">Note:</h3>
      <p className="text-center w-1/2">This exports the data to .JSON file which can then be used to import back to chrome storage</p>
      <p className="text-center w-1/2 my-3">Note: Make sure to back up your notes. Chrome updates could cause unknown bugs. Use the import/export feature.</p>
    </div>
  )
}

const styles = {
  button: "px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-gray-900 text-white hover:bg-white hover:text-black hover:border-2 border-black active:bg-gray-700 active:text-white m-3"
}

export default ImportExport