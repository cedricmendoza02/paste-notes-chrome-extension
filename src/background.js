chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({data: [{title: "Hello", contents: "World"}, {title: "Item2", contents: "World"}]}) // data will contain array of objects
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let method = request.method
        let data = request.data
        console.log(method, data)
        switch(method) {
            case 'POST': {
                post(data).then(() => {
                    chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                        console.log('item saved')
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
        }
        return true;
    }
)

const post = async (data) => {
    let curData = await getData() // get storage
    curData = [...curData.data, data] // add new data content
    chrome.storage.sync.set({data: curData}) // update local storage
    return new Promise(async (resolve, reject) => {
        resolve()
    })    
}

const remove = async (data) => {
    let curData = await getData() // get storage
    let index = -1
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