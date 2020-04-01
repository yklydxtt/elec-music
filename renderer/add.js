const { ipcRenderer } = require('electron')
document.getElementById('select').addEventListener('click',()=>{
    ipcRenderer.send('select','select-music')
})