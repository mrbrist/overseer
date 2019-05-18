// Include and setup packages
const {clipboard} = require('electron');
const $ = require('jquery');

// Setup date and store
var globalDB = []

// String escape function
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }



// Start watching clipboard for changes
var oldClip = clipboard.readText();
setInterval(function() {
  var newClip = clipboard.readText();
  if (newClip !== oldClip) {
    oldClip = newClip
    globalDB.unshift([oldClip, new Date().toString().slice(16,21)])
    console.log(globalDB);
    document.getElementById('clipList').innerText = ""
    for (var i = 0; i < globalDB.length; i++) {
      var content = `<div class="clipItem"><span id="clipPreview">${escapeHtml(globalDB[i][0])}</span><span id="clipTime">${globalDB[i][1]}</span></div>`
      $("#clipList").append(content);
    }
  }
}, 1);
