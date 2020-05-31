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

    mainWindow.loadURL("http://localhost:8000/");
    mainWindow.show();
    splash.destroy();

};

const migrateWagTail = () => {
    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["migrate"],
    };

    PythonShell.run("electronwag/manage.py", options, function (err, results) {
        if (err) throw err;
        runServerWagTail();
    });
};

const runServerWagTail = () => {
    let options = {
        args: ["runserver"],
    };

    createLoadingWindow();

    module.exports.server = new PythonShell("electronwag/manage.py", {
        args: ["runserver"]
    });

    // Give the django server a chance to load
    setTimeout(() => {
        createMainWindow();
    }, 3000);
};

module.exports.loadWagtail = function loadWagtail() {
    migrateWagTail();
}