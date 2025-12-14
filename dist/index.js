import { getMainCapsule } from "./fetch-assets.js";
console.log("js file loaded");
const appIdButton = document.getElementById("enterAppIdBtn");
if (appIdButton != null) {
    console.log("added event");
    appIdButton.addEventListener("click", enterAppIDButtonClick);
}
else {
    console.error("ERROR: Couldn't find App ID button.");
}
function enterAppIDButtonClick() {
    const appIdInputValue = document.getElementById("appIdInput").value;
    if (appIdInputValue != null) {
        console.log(appIdInputValue);
        const mainCapsule = getMainCapsule(appIdInputValue);
        printMainCapsule(mainCapsule);
    }
}
function printMainCapsule(mainCapsule) {
    if (mainCapsule == undefined)
        return console.error("Error: mainCapsule is undefined. ");
    console.log(mainCapsule);
}
//# sourceMappingURL=index.js.map