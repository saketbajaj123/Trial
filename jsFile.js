const electron = (window).require('electron');
function doSomething(len){
    
    electron.ipcRenderer.send('app_loaded', len)


  }

  electron.ipcRenderer.on('app_loaded_reply', (event, arg) => {
    console.log('Got the app_loaded_reply', arg)
    if (arg != '{}'){
      console.log(arg)
    }
  })

  document.getElementById('check').addEventListener("click",() => {
    doSomething((document.getElementById('trial').value).length)
  })