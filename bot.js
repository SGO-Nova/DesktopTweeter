console.log("The bot is starting");

//Electron
{
const electron = require('electron');
const path = require('path');
const ipc = electron.ipcMain;

const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({width: 620, height: 400, resizable: false, frame: false, webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools({mode: 'detach'});

    ipc.on('closeApp', ()=>{
        console.log("Clicked close");
        mainWindow.close();
    });

    ipc.on('minimizeApp', ()=>{
        console.log("Clicked minimize");
        mainWindow.minimize();
    });

    ipc.on('logout', ()=>{
        console.log("Clicked logout");
        //Logout OAUTH
    });

    ipc.on('tweet',(e, arg)=>{
        console.log("Clicked tweet");
        console.log(arg);
        //Send message
        var Twit = require('twit');
        var TwitConfig = require('./key');
        var T = new Twit(TwitConfig);

        var message = arg;
        var tweet = {
            status: message
        }

        function postTweet(err, data, response){
            if(err){
                console.log(data);
            }
            else{
                console.log("Tweet has been sent!");
            }
        }

        T.post('statuses/update', tweet, postTweet);
    });

    ipc.on('login', async ()=>{
        console.log("login Click");
    })

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    })
});



}
