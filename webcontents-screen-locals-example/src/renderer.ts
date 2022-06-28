import { ipcRenderer as ipc } from "electron";

const captureButton = document.getElementById(
    "captureButton"
)! as HTMLButtonElement;

const printButton = document.getElementById("printButton")!;

const captureButtonClickHandler = () => ipc.send("capture-window");
const printButtonClickHandler = () => ipc.send("print-to-pdf");

captureButton.addEventListener("click", captureButtonClickHandler);
printButton.addEventListener("click", printButtonClickHandler);
