import { screen } from "electron";

export function getScreenInfo() {
    const currentScreens = screen.getAllDisplays();
    // console.log("screens", currentScreens);

    const primaryScreen = screen.getPrimaryDisplay();
    // console.log("prime", primaryScreen);

    const { bounds } = primaryScreen;
    return bounds;
}
