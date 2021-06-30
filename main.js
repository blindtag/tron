// Modules to control application life and create native browser window
const electron = require('electron')
const path = require('path')
const url = require('url')
const {app, BrowserWindow, Menu} = electron

let mainWindow
let addWindow
app.on('ready', function(){
  //Create new window
  mainWindow = new BrowserWindow({})

  //Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file',
    slashes: true
  }))
//Quit app when closed
mainWindow.on('closed', function(){
  app.quit()
})
  //Build menu from template
  const mainMenu =Menu.buildFromTemplate(mainMenuTemplate)

  //Insert menu
  Menu.setApplicationMenu(mainMenu)
})
//Handle create add window
function createAddWindow(){
  //Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height:200,
    title: 'Add Shopping List Item'
  })

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file',
    slashes: true
  }))
  //Garbage collection hanedle
  addWindow.on('close', function(){
    addWindow = null
  })
}

//Create menu template
const mainMenuTemplate =[
  {
    label: 'File',
    submenu:[
      {
        label: 'Add Item',
        click(){
          createAddWindow()
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q': 'ctrl+Q',
        click(){
          app.quit()
        }
      }
    ]
  }
]
//If mac, add empty object to the menu
if(process.platform =='darwin'){
  mainMenuTemplate.unshift({});
}
//Add developer tools if not in prod