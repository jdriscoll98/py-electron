let {
    BrowserWindow
} = require("electron");
let {
    PythonShell
} = require("python-shell");


const createWindow = () => {
    window = new BrowserWindow({
        width: 1200,
        height: 900,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    window.loadFile("html/setUp.html");
    window.once("ready-to-show", () => {
        window.show();
    });
};

function generateCMS(callback) {
    const process = require("child_process");
    var child = process.spawn("./scripts/setUp.sh");

    child.stdout.on("data", function (data) {
        console.log(data.toString());
    });
    child.stderr.on("data", function (data) {
        console.log(data.toString());
    });

    child.on("close", function (code) {
        if (code == 0) {
            console.log("success");
            const fs = require('fs');

            let config = {
                wagtailCreated: "true"
            }
            fs.writeFileSync("./config/config.json", JSON.stringify(config));
            const remote = require('electron').remote;
            remote.app.relaunch();
            remote.app.exit(0);
        } else {
            console.log("exited with code " + code);
        }
    });
}



function begin() {
    const beginButton = document.getElementById("begin");
    const thumbNail = document.getElementById("thumbnail");
    const thumbNailContainer = document.getElementById("thumbnail-container");
    const header = document.getElementById("header");
    beginButton.style.opacity = "0";
    header.style.opacity = "0";

    beginButton.addEventListener("transitionend", () => {
        thumbNailContainer.style.display = "block";
        beginButton.remove();
        thumbNail.style.opacity = "1";
        header.style.opacity = "1";
        header.innerHTML = "Choose your theme!";
    });
}

function showPreview(x) {
    const image = document.getElementById("thumbnail");
    const previewButton = document.getElementById("original-preview");
    const selectButton = document.getElementById("select-theme");
    previewButton.style.opacity = "1";
    selectButton.style.opacity = "1";
    image.style.opacity = ".5";
}

function fadeImage(x) {
    const previewButton = document.getElementById("original-preview");
    const selectButton = document.getElementById("select-theme");
    previewButton.style.opacity = "1";
    selectButton.style.opacity = "1";
    const image = document.getElementById("thumbnail");
    image.style.opacity = ".5";
}

function hidePreview(x) {
    const image = document.getElementById("thumbnail");

    const previewButton = document.getElementById("original-preview");
    const selectButton = document.getElementById("select-theme");

    previewButton.style.opacity = "0";
    selectButton.style.opacity = "0";
    image.style.opacity = "1";
}

function previewSite() {
    window.open("https://technext.github.io/original/", "_blank");
}

var numberOfFeatures = 0;

function selectSite() {
    document.getElementById("original-preview").remove();
    document.getElementById("select-theme").remove();
    const container = document.getElementById("thumbnail-container");
    const image = document.getElementById("thumbnail");
    const header = document.getElementById("header");

    container.style.width = "100px";
    container.style.marginLeft = "0";
    container.style.marginRight = "0";
    image.style.opacity = "1";
    header.style.opacity = "0";

    header.addEventListener("transitionend", () => {
        header.innerHTML = "Add your features!";
        header.style.opacity = "1";
        document.getElementById("feature-section").style.display = "block";
        const blog = document.getElementById("blog");
        const blogRect = blog.getBoundingClientRect();
        blog.style.left = blogRect.left;
        blog.style.top = blogRect.top;
        const portfolio = document.getElementById("portfolio");
        const portfolioRect = portfolio.getBoundingClientRect();
        portfolio.style.left = portfolioRect.left;
        portfolio.style.top = portfolioRect.top;
    });
}

function addFeature(id) {
    const feature = document.getElementById(id);
    console.log(feature.children);
    const featureRect = feature.getBoundingClientRect();
    feature.style.left = featureRect.left;
    feature.style.top = featureRect.top + numberOfFeatures * 100;
    feature.style.width = "100px";
    feature.style.height = "70px";
    feature.children[0].style.fontSize = "12px";
    feature.children[1].style.visibility = "hidden";
    feature.children[2].style.visibility = "hidden";
    feature.style.position = "absolute";
    feature.style.left = "5px";
    feature.style.marginLeft = "0";
    numberOfFeatures++;
    feature.addEventListener("transitionend", () => {
        if (numberOfFeatures == 2) {
            const header = document.getElementById("header");
            header.style.opacity = "0";
            header.addEventListener("transitionend", () => {
                header.innerText = "Great!";
                header.style.opacity = "1";
                const finishSection = document.getElementById("finish-section");
                finishSection.style.display = "block";
                const finishButton = document.getElementById("finish");
                finishButton.style.opacity = "1";
            });
        }
    });
}
module.exports.setUpWagtail = () => {
    createWindow();
};