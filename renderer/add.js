const { ipcRenderer } = require('electron')
const path = require('path');
let musicFilesPath=[]
document.getElementById('select').addEventListener('click', () => {
    ipcRenderer.send('select', 'select-music')
})
ipcRenderer.on('add', (e, { filePaths }) => {
    if(Array.isArray(filePaths)){
        const html = filePaths.map((item) => {
            return `<li class="list-group-item">${path.basename(item)}</li>`
        })
        document.getElementById('add').innerHTML += html.join();
    }
    musicFilesPath.push(...filePaths);
})
document.getElementById('add-music').addEventListener('click', () => {
    ipcRenderer.send('add-tracks', musicFilesPath);
})