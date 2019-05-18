// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.
const {clipboard} = require('electron');
// var content = clipboard.readText();
// alert(content);
var oldClip = clipboard.readText();
setInterval(function(){
  var newClip = clipboard.readText();
  if (newClip !== oldClip) {
    oldClip = newClip
    console.log(oldClip)
  }
}, 1);
