// Modules to control application life and create native browser window
const electron = require('electron')
const path = require('path')
const url = require('url')
const {app, BrowserWindow} = electron

let mainWindow

app.on('ready', function(){
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWimdow.html'),
    protocol: 'file',
    slashes: true
  }))
})
