// --- Utilities ---

function close_browser() {
  chrome.runtime.sendMessage('close');
}

function close_tab() {
  chrome.runtime.sendMessage('close_tab');
  console.log('close tab!!!');
}



// --- locate and collect data ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {   
  sendResponse({ok: true});
  
  try {
    let v = document.querySelector(message.selector).innerText.replace(/,/g, '').trim();
    fetch('https://measury.io/' + message.key + '/' + message.metric + '/' + v);
  }
  catch ( e ) {
    console.log(e);
  }
});