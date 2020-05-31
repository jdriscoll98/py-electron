const {
  app,
} = require("electron");
const wagtail = require('./js/wagtail')
const {
  setUpWagtail
} = require('./js/setUp')
const {
  readJson
} = require("./js/util");


// This is the code to load a current Wagtail Project in the electron broswer
// 
// 
// app.on("ready", () => {
//   wagtail.loadWagtail()
// });
// 
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     wagtail.server.childProcess.kill("SIGINT");
//     mainWindow = null;
//     app.quit();
//   }
// });

app.on("ready", () => {
  readJson("../config/config.json", (err, config) => {
    if (config.wagtailCreated) {
      wagtail.loadWagtail()
    } else {
      setUpWagtail();
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})