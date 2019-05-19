// Include and setup packages
const {clipboard} = require('electron');
const $ = require('jquery');
const uuidv1 = require('uuid/v1');

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

// Events from client
$('#clearBtn').on( "click", function() {
  // console.log("CLICKED");
  globalDB = []
  $("#clipList").html("<span id='noClips'>No clipboard history :(</span>")
});

// When the user clicks a clip it will be moved to the clipboard
$('#clipList').on("click", ".clipItem", function(){
  // Gets UUID element text
  var clipUUID = $(this).children()[0].innerText
  var clipFromArray = globalDB.find(clip => clip[0] === clipUUID)[1];
  clipboard.writeText(clipFromArray)
});

// Start watching clipboard for changes
setInterval(function() {
  var newClip = clipboard.readText();
  if (globalDB.find(clip => clip[1] === newClip) === undefined) {
    globalDB.unshift([uuidv1(), newClip, new Date().toString().slice(16,21)])
    // console.log(globalDB);
    document.getElementById('clipList').innerText = ""
    for (var i = 0; i < globalDB.length; i++) {
      var content = `<div class="clipItem"><span id="uuid" style="display: none">${globalDB[i][0]}</span><span id="clipPreview">${escapeHtml(globalDB[i][1])}</span><span id="clipTime">${globalDB[i][2]}</span></div>`
      $("#clipList").append(content);
    }
  }
}, 1);
