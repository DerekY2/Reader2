function t(e) {
  chrome.scripting.executeScript({
      target: {
          tabId: e.id,
          allFrames: true
      },
      files: ["javascripts/readability.js",
              "javascripts/jquery-3.4.1.min.js", 
              "javascripts/jquery-ui.min.js", 
              "javascripts/fullscreen.min.js", 
              "javascripts/tag-it.js", 
              "javascripts/content.js"]
  })
}

function i(e) {
  t(e)
}
chrome.action.onClicked.addListener((e => {
  i(e)
})), chrome.contextMenus.create({
  id: "view-selection",
  title: "View in Reader",
  contexts: ["selection"]
}), linkCMId = chrome.contextMenus.create({
  id: "view-linked-page",
  title: "View the linked page using ReaderMode",
  contexts: ["link"]
}), chrome.contextMenus.onClicked.addListener((function(e) {
  "view-selection" == e.menuItemId ? chrome.tabs.query({
      active: !0
  }, (function(e) {
      let t = e[0];
      startReader(t)
  })) : "view-linked-page" == e.menuItemId && e.linkUrl && chrome.tabs.create({
      url: e.linkUrl,
      active: !1
  }, (function(e) {
      t(e)
  }))
})), articles_checked_for_current_url = !1;