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




// --- Background fetch processing ---

function fetch_value(pull) {
  try {
    chrome.tabs.create({ url: pull.url, active: false}, function(t) {
      setTimeout(function() {
        chrome.tabs.sendMessage(t.id, pull, function(response) {
          setTimeout(function() {
            chrome.tabs.remove(t.id);
          }, 5000);
        });
      }, 5000);
    });
  }
  catch ( e ) {
    console.log(e);
  }
}

function update() {
  fetch('https://measury.io/m/pulls?json=1').then(function(r) {
    return r.json();
  }).then(function(data) {
    data.forEach(function(p) { fetch_value(p); });
    setTimeout(update, 60 * 10 * 1000);
  });
}

update();