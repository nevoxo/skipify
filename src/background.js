chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

    chrome.tabs.executeScript(tab.ib, {
		file: 'skipper.js'
	});

  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('blacklist.html'));
  }
});
