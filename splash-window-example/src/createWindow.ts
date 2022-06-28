import { BrowserWindow } from "electron";
import { join } from "path";

export async function createWindow(
    fileStr: string,
    options?: Electron.BrowserWindowConstructorOptions
) {
    let window: null | BrowserWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        ...options,
    });
    await window.loadFile(join(__dirname, "..", fileStr));
    // window.once("ready-to-show", () => void window?.show());
    window.on("closed", () => void (window = null));
    return window;
}
