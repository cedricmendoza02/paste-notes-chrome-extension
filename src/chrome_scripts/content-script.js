chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        const elem = getActiveElement(document.activeElement)
        elem.value = request.data.contents
        sendResponse('Pasted with no errors')
    }
)

const getActiveElement = (activeElement) => {
    let elem = activeElement
    if(elem.tagName === 'IFRAME') {
        return getActiveElement(elem.contentWindow.document.activeElement)
    } else {
        return elem
    }
}
