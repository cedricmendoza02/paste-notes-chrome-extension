var parent
var storage

/* Chrome methods */
chrome.runtime.onInstalled.addListener(() => {
    // Set storage to an array property named data with 1 default list item
    chrome.storage.sync.set({data: [{title: "First Item", contents: "I hope you find this app useful\nFeel free to delete this note."}]}, async () => {
        let response = await getData()
        storage = response.data
        console.log('storage initialized ', storage)
    }) // data will contain array of objects
    // create the parent context menu on install
    parent = chrome.contextMenus.create({"title": "Paste Notes", "id": "parent", "contexts": ["editable"], "visible": true, "enabled": true}, function() { console.log(chrome.runtime.lastError)})
})

chrome.runtime.onMessage.addListener(
    // API
    function(request, sender, sendResponse) {
        let method = request.method
        let data = request.data
        console.log(method, data)
        switch(method) {
            case 'POST': {
                post(data).then((response) => {
                    console.log(response)
                    chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
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
            } case 'PUT': {
                put(data)
            }
        }
        return true;
    }
)

// Recreate the context list when the storage is changed
chrome.storage.onChanged.addListener((changes) => {
    storage = changes.data.newValue
    createContextMenu()
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("tab", tab)
    console.log("info", info)
    chrome.tabs.sendMessage(tab.id, { action: "paste", data: storage[info.menuItemId] }, 
        (res) => {
            if(chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message)
                return
            }
            console.log(res)
        })
})

/* Other methods */
const post = async (data) => {
    let response = await getData() // get storage
    let curData = response.data
    console.log(curData)
    let index = curData.findIndex(element => element.title === data.title)
    if(index === -1) { // If no similar text is found, proceed with adding the note
        curData = [...curData, data] // add new data content
        chrome.storage.sync.set({data: curData}) // update local storage
        return new Promise((resolve, reject) => {
            resolve('Note saved')
        })    
    }
    return new Promise(async (resolve, reject) => {
        update(curData, data, index)
        .then(response => resolve('Existing note found. Note updated.'))
    })
    
}

const update = (curData, newData, index) => {
    curData[index] = newData
    chrome.storage.sync.set({data: curData}) // update local storage
        return new Promise((resolve, reject) => {
            resolve('Note saved')
    })    
}

const remove = async (data) => {
    let curData = await getData() // get storage
    let index = -1
    // remove the element matching the data
    curData = curData.data.filter((elem, i) => {
        if(elem.title === data.title) {
            index = i
            return 
        }
        return elem
    })
    chrome.storage.sync.set({data: curData})
    return new Promise(async (resolve, reject) => {
        if(index < 0) reject('Item not found!')
        resolve()
    })
}

// returns data in format {data: [...]}
const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (res) => resolve(res))
    })
}

const createContextMenu = async () => {
  let response = await getData()
  let data = response.data
  console.log(data)
  chrome.contextMenus.removeAll()
  parent = chrome.contextMenus.create(
    {
        "title": "Paste Notes", 
        "id": "parent", "contexts": ["editable"], 
        "visible": true, 
        "enabled": true
    }, 
    function() { 
        if(chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError)
        }
    })
  
  if(!data) return // if data undefined, don't create children yet
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

createContextMenu()