// --- Utilities ---

function close_browser() {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.remove(tabs[i].id);
    }
  });
}

function close_tab() {
  chrome.tabs.query({ active: true }, function(tabs) {  
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.remove(tabs[i].id);
    }   
  }); 
}



// --- Listen events from frontend script ---

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if ( message == 'close' ) {
    return close_browser();
  }
  else if ( message == 'close_tab' ) {
    chrome.tabs.remove(sender.tab.id);
  }
});