/*********************** START OF OTHER METHODS ***********************/

const post = async (note) => {
    let storage = await getData() // get storage
    let index = storage.findIndex(element => element.title === note.title)
    if(index === -1) { // If no similar text is found, proceed with adding the note
        storage = [...storage, note] // add new data content
        chrome.storage.sync.set({data: storage}) // update local storage
        return new Promise((resolve, reject) => {
            resolve('Note saved')
        })    
    }
    return new Promise(async (resolve, reject) => {
        update(storage, note, index)
        .then(response => resolve('Existing note found. Note updated.'))
    })
}

const update = (storage, newData, index) => {
    storage[index] = newData
    chrome.storage.sync.set({data: storage}) // update local storage
        return new Promise((resolve, reject) => {
            resolve('Note saved')
    })    
}

const remove = async (note) => {
    let storage = await getData() // get storage
    let index = -1
    // remove the element matching the data
    let newStorage = storage.filter((elem, i) => {
        if(elem.title === note.title) {
            index = i
            return 
        }
        return elem
    })
    chrome.storage.sync.set({data: newStorage})
    return new Promise(async (resolve, reject) => {
        if(index < 0) reject('Item not found!')
        resolve()
    })
}

const moveItemUp = async (index) => {
    let data = await getData()
    let newIndex = index
    return new Promise((resolve, reject) => {
        if(!index) return reject('Item is already at the top.')
        let temp = data[index - 1] // get item before
        data[index - 1] = data[index]
        data[index] = temp;
        chrome.storage.sync.set({data: data}, () => {
            newIndex = index - 1
            resolve(newIndex)
        })
    })
}

const moveItemDown = async (index) => {
    let data = await getData()
    let newIndex = index
    return new Promise((resolve, reject) => {
        if(index === data.length - 1) return reject('Item is already at the bottom.')
        let temp = data[index + 1] // get item after
        data[index + 1] = data[index]
        data[index] = temp;
        chrome.storage.sync.set({data: data}, () => {
            newIndex = index + 1
            resolve(newIndex)
        })
    })
}

const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (res) => {
            if(chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError)
            }
            if(!res.data) {
                resolve([])
            } else {
                resolve(res.data)
            }
        })
    })
}

const createContextMenu = async (parentId) => {
    let data
    try {
       data  = await getData()
    } catch(e) {
        console.log(e)
    }
    
    console.log(`Creating context menu with: ${JSON.stringify(data)}`)
    chrome.contextMenus.removeAll()
    let parent = chrome.contextMenus.create(
      {
          "title": "Paste Notes", 
          "id": "parent", 
          "contexts": ["editable"], 
          "visible": true, 
          "enabled": true
      }, 
      function() { 
          if(chrome.runtime.lastError) {
              console.log(chrome.runtime.lastError)
          }
      })
    
    if(!data.length) return // if array is empty
    data.forEach((elem, i) => {
      const props = {
          title: elem.title,
          id: `${i}`,
          parentId: parent,
          contexts: ["editable"]
      }
      chrome.contextMenus.create(props) 
    })
}

/*********************** START OF CHROME METHODS ***********************/
// initial state
chrome.runtime.onInstalled.addListener(async () => {
    let parentId = chrome.contextMenus.create(
        {
            "title": "Paste Notes", 
            "id": "parent", 
            "contexts": ["editable"], 
            "visible": true, 
            "enabled": true
        }, () => { 
            if(chrome.runtime.lastError) console.log(chrome.runtime.lastError)
    })
    createContextMenu(parentId)
})

chrome.runtime.onMessage.addListener(
    // API
    function(request, sender, sendResponse) {
        let method = request.method
        let data = request.data

        switch(method) {
            case 'POST': {
                post(data).then((response) => {
                    console.log(response)
                    chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                        console.log(`POST success: ${res}`)
                        sendResponse({message: 'success', res})
                    }) 
                })
                break
            }
            case 'DELETE': {
                remove(data)
                    .then(() => {
                        chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                            sendResponse({message: 'success', res})
                        }) 
                    })
                    .catch(response => {
                        chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                            sendResponse({message: response, res})
                        }) 
                    })
                break
            } 
            case 'move-up': {
                moveItemUp(data).then(response => {
                    chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                        sendResponse({message: 'success', res, newIndex: response})
                    }) 
                }).catch(err => console.log(err))
                break
            }
            case 'move-down': {
                moveItemDown(data).then(response => {
                    chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                        sendResponse({message: 'success', res, newIndex: response})
                    }) 
                }).catch(err => console.log(err))
                break
            }
            case 'download': {
                chrome.downloads.download({
                    saveAs: true,
                    filename: "notes.json",
                    url: data
                })
                break
            }
            case 'upload': {
                chrome.storage.sync.set(JSON.parse(data), res => {
                    sendResponse({message: 'list updated'})
                })
                break;
            }
        }
        return true;
    }
)

// Recreate the context list when the storage is changed
chrome.storage.onChanged.addListener((changes) => {
    createContextMenu()
    chrome.runtime.sendMessage({method: "update-display", changes})
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    let storage 
    try {
       storage = await getData()
    } catch(e) {    
        console.log(e)
    }
    
    chrome.tabs.sendMessage(tab.id, { action: "paste", data: storage[info.menuItemId] }, 
        (res) => {
            if(chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message)
                return
            }
            console.log(res)
        })
})
/*********************** END OF CHROME METHODS ***********************/