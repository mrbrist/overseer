// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.
const {clipboard} = require('electron');
const remote = require('electron').remote;
const app = remote.app;
var Datastore = require('nedb'),
  db = new Datastore({ filename: app.getPath('userData') + '/data', autoload: true });


function addSlashes(str) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
// Start watching clipboard for changes
var oldClip = addSlashes(clipboard.readText());
setInterval(function() {
  var newClip = addSlashes(clipboard.readText());
  if (newClip !== oldClip) {
    oldClip = newClip
    db.insert({oldClip}, function (err, newDoc) {
      db.find({}, function (err, docs) {
        console.log(docs);
      });
    });
  }
}, 1);
