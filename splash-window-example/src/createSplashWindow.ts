import { BrowserWindow } from "electron";
import { join } from "path";

export async function createSplashWindow(fileStr: string) {
    let splashWindow: null | BrowserWindow = new BrowserWindow({
        width: 320,
        height: 240,
        frame: false,
        resizable: false,
        backgroundColor: "#FFF",
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    await splashWindow.loadFile(join(__dirname, "..", fileStr));
    // splashWindow.once("ready-to-show", () => void splashWindow?.show());
    splashWindow.on("closed", () => void (splashWindow = null));
    return splashWindow;
}
