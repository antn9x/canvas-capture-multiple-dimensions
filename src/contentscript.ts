// alert('hello from extension')
function DownloadCanvasAsImage() {
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'CanvasAsImage.png');
  let canvas = document.getElementById('snake');
  if (canvas instanceof HTMLCanvasElement) {
    canvas.toBlob(function (blob) {
      if (blob) {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
      }
    });
  }
}
function openCanvasInNewTab() {
  const canvas = document.getElementById('snake')
  console.log('ac', canvas)
  if (canvas instanceof HTMLCanvasElement) {
    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank', 'image from canvas');
    if (newTab)
      newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }
}
// DownloadCanvasAsImage()
// openCanvasInNewTab()
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if( request.message === "start" ) {
        DownloadCanvasAsImage();
      }
  }
);
