import { BrowserWindow, webContents } from "electron";

interface Did$Load$Event {
    /**
     * Returns the `webContents` that sent the message
     */
    sender: webContents & {
        browserWindowOptions: Electron.BrowserWindowConstructorOptions;
    };
}

export function createWindow(
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

    window.webContents.on("did-start-loading", (event: Did$Load$Event) => {
        const title = event.sender.browserWindowOptions.title;
        // console.log("did-start-loading", title);
    });

    window.webContents.on("dom-ready", event => {
        // console.log("dom-ready");
    });

    window.webContents.on("did-finish-load", (event: Did$Load$Event) => {
        const titleOfCurrentWebPage = event.sender.getTitle();
        const titleOfNativeWindow = BrowserWindow.fromId(
            event.sender.id
        )?.getTitle();

        // console.log(
        //     "did-finish-load",
        //     titleOfNativeWindow,
        //     titleOfCurrentWebPage
        // );
    });
    window.webContents.on("did-stop-loading", (event: Did$Load$Event) => {
        const title = event.sender.browserWindowOptions.title;
        // console.log("did-stop-loading", title, event.sender.id);
    });

    window.loadURL(`file://${__dirname}/../${fileStr}`);
    window.once("ready-to-show", () => void window?.show());
    window.on("closed", () => void (window = null));
    return window;
}
