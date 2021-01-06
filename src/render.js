const { dialog } = require('electron').remote;
const { BrowserWindow } = require('electron').remote;
const fs = require('fs');
const remote = require("electron").remote;
// const win = new BrowserWindow({ width: 800, height: 600 })
// Load a remote URL
// win.loadURL('https://github.com')
const { app, globalShortcut } = require('electron').remote

var mWin = remote.getCurrentWindow();
mWin.removeMenu()
var files = [];
var folders = [];
var imgCur = 0;

async function openFolder() {
    files = [];
    folders = [];
    imgCur = 0;
    var folder = await dialog.showOpenDialog(mWin, {
        properties: ['openFile', 'openDirectory'] // properties: ['openFile', 'openDirectory', 'multiSelections']
    });
    folders.push(folder.filePaths[0]);
    if (folder.canceled != true) {
        for (var i = 0; i < fs.readdirSync(folder.filePaths[0]).length; i++) {
            files.push(fs.readdirSync(folder.filePaths[0])[i]);
            //console.log(fs.readdirSync(folder.filePaths[0])[i])
        }
        document.getElementById("img").src = `${folders[0]}/${files[0]}`;
        globalShortcut.register('Left', () => {
            leftMv();
        });
        globalShortcut.register('Right', () => {
            rightMv(files.length);
        });
    }
}
function leftMv() {
    if (imgCur - 1 < 0) {
        return;
    }
    imgCur--;
    console.log(imgCur)
    document.getElementById("img").src = `${folders[0]}/${files[imgCur]}`;
}
function rightMv(imgT) {
    if (imgCur + 1 > imgT - 1) {
        return;
    }
    imgCur++;
    console.log(imgCur)
    document.getElementById("img").src = `${folders[0]}/${files[imgCur]}`;
}