import { getMainCapsule } from "./fetch-assets.js";

console.log("js file loaded");
/* 
    Shift f1 -> Run Build Task to run TS watch
*/


/*  Adds event listener to appIdButton.
    TODO: Simplify this function to just return error if null.  
*/
const appIdButton = document.getElementById("enterAppIdBtn");
if (appIdButton != null) {
    console.log("added event");
    appIdButton.addEventListener("click", enterAppIDButtonClick); 
} else {
    console.error("ERROR: Couldn't find App ID button.");
}

/* Adds the click to appIdButton 
   TODO: Simplify this function to just return error if null.  
*/
async function enterAppIDButtonClick() {
    const appIdInputValue = (<HTMLInputElement>document.getElementById("appIdInput")).value;
    if (appIdInputValue != null) {
        console.log(appIdInputValue);
        const blob = await getMainCapsule(appIdInputValue);
        printMainCapsule(blob);
    }
}

function printMainCapsule(blob: Blob | undefined) {
    if (blob == undefined) return console.error("Error: mainCapsule is undefined. ");
    let img = document.createElement("img"); 
    img.src = URL.createObjectURL(blob);
    document.body.appendChild(img);
}