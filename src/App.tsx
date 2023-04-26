import * as React from 'react'

import logo from './logo.svg'

import * as classes from './App.css'

function App() {
  function onClickCapture() {
    chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
      var activeTab = tabs[0];
      // if (currentWindow.id)
      //   await chrome.windows.update(currentWindow.id, { width: 1500, height: 2000 });
      // const url = await chrome.tabs.captureVisibleTab();
      // console.log(url)
      // chrome.devtools.
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
        // chrome.tabs.sendMessage(activeTab.id, { "message": "capture", url });
      }
    });
  }

  return (
    <div className={classes.container}>
      <img src={logo} className={classes.logo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>

      <button onClick={onClickCapture}>Capture</button>
    </div>
  )
}

export default App
