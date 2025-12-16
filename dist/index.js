//Shift f1 -> Run Build Task to run TS watch
console.log("js file loaded");
/**
 *
 * Event Listeners
 *
 */
const appIdButton = document.getElementById("enterAppIdBtn");
const downloadBtn = document.getElementById("downloadBtn");
if (appIdButton == null) {
    console.error("Couldn't find App ID button.");
}
else {
    appIdButton.addEventListener("click", enterAppIDButtonClick);
}
if (downloadBtn == null) {
    console.error("Couldn't find App ID button.");
}
else {
    downloadBtn.addEventListener("click", downloadButtonClick);
}
async function enterAppIDButtonClick() {
    const appIdInputValue = (document.getElementById("appIdInput")).value;
    if (appIdInputValue == null)
        return;
    const blobs = await getAllAssets(appIdInputValue);
    printAllAssets(blobs);
}
async function downloadButtonClick() {
    const imgs = document.querySelectorAll("img"); // Selects all imgs
    let urls = [];
    imgs.forEach((el) => {
        if (el.nextElementSibling.checked) {
            // Presumes all next element of img are an HTMLInputElement.
            urls.push(el.src);
        }
    });
    console.log(urls);
    const promises = urls.map(async (url) => {
        const result = await fetch(url);
        const blob = await result.blob();
        return blob;
    });
    const blobs = await Promise.all(promises);
    const zip = new JSZip();
    blobs.forEach((blob, index) => {
        zip.file(`image${index}.jpg`, blob);
    });
    const readme = zip.folder("readme");
    readme.file("readme.txt", "Created with JSZip");
    const zipFile = await zip.generateAsync({ type: "blob" });
    console.log(zipFile);
    downloadZip(zipFile);
}
function downloadZip(file) {
    const a = document.createElement("a");
    a.download = "test.zip";
    const url = URL.createObjectURL(file);
    a.href = url;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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
        if (blob) {
            blobs.push(blob);
        }
        else {
            blobs.push(undefined);
        }
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
    const imgIds = [
        "main_capsule_img",
        "small_capsule_img",
        "header_img",
        "library_capsule_img",
        "2xlibrary_capsule_img",
        "library_hero_img",
    ];
    for (let i = 0; i < blobs.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        let input = document.createElement("input");
        input.type = "checkbox";
        const blob = blobs[i];
        if (!blob) {
            img.src =
                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
            input.checked = false;
        }
        else {
            img.src = URL.createObjectURL(blob);
            input.checked = true;
        }
        img.id = imgIds[i];
        div.appendChild(img);
        div.appendChild(input);
        document.body.appendChild(div);
    }
}
export {};
//# sourceMappingURL=index.js.map