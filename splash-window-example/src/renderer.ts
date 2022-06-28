// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { ipcRenderer as ipc } from "electron";

ipc.send("get-version");

setTimeout(() => {
    ipc.send("app-init");
}, 5000);
