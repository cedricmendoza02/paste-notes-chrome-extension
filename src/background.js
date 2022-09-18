chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({data: [{title: "Hello", contents: "World"}]}) // data will contain array of objects
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let method = request.method
        let data = request.data
        console.log(method, data)
        updateStorage(data).then(() => {
            chrome.storage.sync.get(null, (res) => { // passing null, retrieves all data
                console.log('item saved')
                sendResponse({message: 'success', res})
            }) 
        })
        return true;
    }
)

const updateStorage = async (data) => {
    let curData = await getData() // get storage
    curData = [...curData.data, data] // add new data content
    chrome.storage.sync.set({data: curData}) // update local storage
    return new Promise(async (resolve, reject) => {
        resolve()
    })    
}

const getData = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (res) => resolve(res))
    })
}