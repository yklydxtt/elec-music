const { app, BrowserWindow, ipcMain,dialog } = require('electron')

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
  ipcMain.on('select',()=>{
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'music', extensions: ['mp3'] }
      ]
    }).then((file)=>{
      console.log(file)
    })
  })
}

app.whenReady().then(createWindow)