const { app, BrowserWindow, ipcMain,dialog } = require('electron')
const DataStore=require('./renderer/MusicDataStore');
const myStore=new DataStore({
  'name':'musicData'
});
class appWindow extends BrowserWindow {
  constructor(config, filepath) {
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = { ...baseConfig, ...config }
    super(finalConfig);
    this.loadFile(filepath)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

function createWindow() {
  // 创建浏览器窗口
  let win = new appWindow({}, './renderer/index.html')
  ipcMain.on('add', () => {
    let addMusic = new appWindow({
      width: 600,
      height: 400,
      parent: win
    }, './renderer/add.html')
  })
  ipcMain.on('add-tracks',(e,tracks)=>{
    console.log(tracks);
  })
  ipcMain.on('select',(e)=>{
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'music', extensions: ['mp3'] }
      ]
    }).then((file)=>{
      if(file){
        e.reply('add',file)
      }
    })
  })
  ipcMain.on('add-music',()=>{
    console.log(1)
  })
}

app.whenReady().then(createWindow)