const {
  app,
  BrowserWindow
} = require("electron");
const wagtail = require('./js/wagtail')
const {
  setUpWagtail
} = require('./js/setUp')
const {
  readJson
} = require("./js/util");



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