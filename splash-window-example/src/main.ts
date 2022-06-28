import { app, BrowserWindow, ipcMain as ipc } from "electron";
import { createWindow } from "./createWindow";
import { createSplashWindow } from "./createSplashWindow";

let mainWindow: null | BrowserWindow = null;
let splashWindow: null | BrowserWindow = null;

app.on("ready", async () => {
    splashWindow = await createSplashWindow("splash.html");
    splashWindow.once("ready-to-show", async () => {
        splashWindow?.show();
        mainWindow = await createWindow("index.html");
    });
});

app.on("window-all-closed", () => app.quit());

// SPLASH WINDOW: REQUEST FOR VERSION
ipc.on("get-version", event => {
    event.sender.send("set-version", app.getVersion());
});

ipc.on("app-init", event => {
    if (splashWindow) {
        setTimeout(() => {
            splashWindow?.close();
        }, 2000);
    }
    mainWindow?.show();
});
