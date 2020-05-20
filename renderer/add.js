const { ipcRenderer } = require('electron')
const path = require('path')
document.getElementById('select').addEventListener('click',()=>{
    ipcRenderer.send('select','select-music')
})
ipcRenderer.on('add',(e,{filePaths})=>{
    console.log(filePaths)
    const html=filePaths.map((item)=>{
        return `<li class="list-group-item">${path.basename(item)}</li>`
    })
    document.getElementById('add').innerHTML+=html.join()
})