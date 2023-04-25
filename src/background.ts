// import extension from './extensionAPIs'
// import './hot-reload'

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('extension installed!')
  }
})
