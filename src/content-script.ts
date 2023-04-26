
function DownloadCanvasAsImage(dimension: string) {
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', `screen_shoot_${dimension}_${Date.now()}.png`);
  let canvas = document.getElementById('GameCanvas');
  if (canvas instanceof HTMLCanvasElement) {
    downloadLink.setAttribute('href', canvas.toDataURL("image/png")
      .replace("image/png", "image/octet-stream"));
    downloadLink.click();
    downloadLink.remove();
  }
}

function openCanvasInNewTab() {
  const canvas = document.getElementById('GameCanvas')
  console.log('ac', canvas)
  if (canvas instanceof HTMLCanvasElement) {
    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank', 'image from canvas');
    if (newTab)
      newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    const canvas = document.getElementById('GameCanvas');
    if (canvas instanceof HTMLCanvasElement) {
      canvas.getContext('webgl', { preserveDrawingBuffer: true });
    }
    if (request.message === "capture") {
      console.log('capture', request.url.length)
      var newTab = window.open('about:blank', 'image from canvas');
      if (newTab)
        newTab.document.write("<img src='" + request.url + "' alt='from canvas'/>");
    }
    if (request.message === "start") {
      const evt = new CustomEvent('myCustomEvent', {
        detail: { width: 100, height: 200 }
      });
      // fire the event
      // document.dispatchEvent(evt);
      for (let index = 0; index < 8; index++) {
        const selections = document.querySelector('#opts-device');
        setTimeout(() => {
          if (selections instanceof HTMLSelectElement) {
            selections.value = `${Math.floor(index / 2) + 1}`;
            const evtChange = document.createEvent("HTMLEvents");
            evtChange.initEvent("change", true, true);
            selections.dispatchEvent(evtChange);
            if (index % 2)
              DownloadCanvasAsImage(selections.textContent!);
          }
        }, 500 * index)
      }
    }
  }
);
