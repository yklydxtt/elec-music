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
  let win = new appWindow({}, './renderer/index.html');
  win.webContents.on('did-finish-load',()=>{
    console.log('did finish');
    win.send('getTracks',myStore.getTracks())
  })
  ipcMain.on('add', () => {
    let addMusic = new appWindow({
      width: 600,
      height: 400,
      parent: win
    }, './renderer/add.html')
  })
  ipcMain.on('add-tracks',(e,tracks)=>{
    myStore.addTracks(tracks);
    win.send('getTracks',myStore.getTracks())
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
  ipcMain.on('add-music',(e,tracks)=>{
    myStore.addTracks(tracks);
    console.log(myStore.getTracks(),11);
  })
}

app.whenReady().then(createWindow)