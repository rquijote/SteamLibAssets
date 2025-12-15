//Shift f1 -> Run Build Task to run TS watch
console.log("js file loaded");
/**
 *
 * Event Listeners
 *
 */
const appIdButton = document.getElementById("enterAppIdBtn");
if (appIdButton == null) {
    console.error("Couldn't find App ID button.");
}
else {
    appIdButton.addEventListener("click", enterAppIDButtonClick);
}
async function enterAppIDButtonClick() {
    const appIdInputValue = (document.getElementById("appIdInput")).value;
    if (appIdInputValue == null)
        return;
    const blobs = await getAllAssets(appIdInputValue);
    printAllAssets(blobs);
}
/**
 *
 * Fetch Assets Functions
 *
 */
async function getAllAssets(appID) {
    const urls = [
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/capsule_616x353.jpg`, // main capsule
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/capsule_231x87.jpg`, // small capsule
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/header.jpg`, // header
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/library_600x900.jpg`, // library capsule
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/library_600x900_2x.jpg`, // library capsule 2x
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/library_hero.jpg`, // library hero
    ];
    let blobs = [];
    for (const url of urls) {
        const blob = await getBlob(url);
        if (blob)
            blobs.push(blob);
    }
    return blobs;
}
async function getBlob(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await fetch(url);
        const blob = await result.blob();
        return blob;
    }
    catch (error) {
        console.error(error.message);
    }
}
/**
 *
 * Frontend DOM Functions
 *
 */
function printAllAssets(blobs) {
    blobs.forEach((blob) => {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
    });
}
export {};
//# sourceMappingURL=index.js.map