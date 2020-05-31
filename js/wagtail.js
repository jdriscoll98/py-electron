let {
    BrowserWindow
} = require("electron");

let {
    PythonShell
} = require("python-shell");

const createLoadingWindow = () => {
    splash = new BrowserWindow({
        center: true,
        width: 1200,
        height: 900,
        resizable: true,
        alwaysOnTop: true,
        frame: false,
    });
    splash.loadFile("loading.html");
};
const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        center: true,
        width: 1200,
        height: 900,
        resizable: true,
        show: false,
    });

    mainWindow.loadURL("http://localhost:8000/admin");
    mainWindow.show();
    splash.destroy();

};




module.exports.loadWagtail = function loadWagtail() {
    createLoadingWindow();

    const process = require("child_process");
    var child = process.spawn("./scripts/run.sh");

    child.stdout.on("data", function (data) {
        console.log(data.toString());
    });
    child.stderr.on("data", function (data) {
        console.log(data.toString());
    });
    setTimeout(() => {
        createMainWindow();
    }, 3000);
}