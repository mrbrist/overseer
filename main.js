const { menubar } = require('@amaurymartiny/menubar');

const mb = menubar({
  height: 550,
  width: 450,
  icon: 'assets/logo_16.png'
});

mb.on('ready', () => {
  console.log('app is ready');
  // your app code here
});
