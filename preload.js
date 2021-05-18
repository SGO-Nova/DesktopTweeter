const electron = require('electron');
const ipc = electron.ipcRenderer;
//ipc sends messages between the preloader and the main

//Close
closeBtn.addEventListener('click', ()=>{
    ipc.send('closeApp');
});

//Minimize
minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minimizeApp');
});

//Logout
logout.addEventListener('click', ()=>{
    ipc.send('logout');
    backgroundBody.classList.add("blur");
    loginDiv.style.visibility = "visible";
});

//Tweet
tweetButton.addEventListener('click',()=>{
    ipc.send('tweet', messageBody.value);

    messageBody.value = "";
})


//Tweet body auto resize 
autosize(messageBody);

//Login
login.addEventListener('click', ()=>{
    ipc.send('login');

    backgroundBody.classList.remove("blur");
    loginDiv.style.visibility = "hidden";
})