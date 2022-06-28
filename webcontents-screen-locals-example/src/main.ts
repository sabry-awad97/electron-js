import { writeFile } from "fs/promises";
import { join } from "path";
import { app, ipcMain as ipc, BrowserWindow } from "electron";
import { createWindow } from "./createWindow";
import { getScreenInfo } from "./getScreenInfo";

let mainWindow: null | BrowserWindow = null;
let secondWindow: null | BrowserWindow = null;

app.on("ready", () => {
    console.log(app.getLocale());
    mainWindow = createWindow("index.html", {
        backgroundColor: "#FFF",
        title: "MAIN",
    });

    const screenBounds = getScreenInfo();
    const newX = screenBounds.width - 400;
    const newY = screenBounds.height - 400;

    secondWindow = createWindow("index.html", {
        x: newX,
        y: newY,
        width: 400,
        height: 400,
        title: "SECOND",
        backgroundColor: "#FFF",
    });
});

app.on("window-all-closed", () => app.quit());

ipc.on("capture-window", async event => {
    const windowToCapture = BrowserWindow.fromId(event.sender.id)!;
    const bounds = windowToCapture.getBounds();
    try {
        const imageCaptured = await windowToCapture.webContents.capturePage({
            x: 0,
            y: 0,
            width: bounds?.width!,
            height: bounds?.height!,
        });
        const desktop = app.getPath("desktop");
        const filePath = join(
            desktop,
            `${windowToCapture.getTitle()}-captured-file.png`
        );
        console.log(filePath);
        const png = imageCaptured.toPNG();

        await writeFile(filePath, png);
    } catch (error) {
        console.error("Error in capturing image", error);
    }
});

ipc.on("print-to-pdf", async event => {
    try {
        const windowToPrint = BrowserWindow.fromId(event.sender.id)!;
        const pdfCreated = await windowToPrint.webContents.printToPDF({});
        const desktop = app.getPath("desktop");
        const filePath = join(
            desktop,
            `${windowToPrint.getTitle()}-printed.pdf`
        );
        console.log(filePath);
        await writeFile(filePath, pdfCreated);
    } catch (error) {
        console.error("Error in printing to pdf", error);
    }
});
