console.log("js file loaded");

const appIdButton = document.getElementById("entferAppIdBtn");
if (appIdButton != null) {
    console.log("added event");
    appIdButton.addEventListener("click", buttonClick); 
} else {
    console.error("ERROR: Couldn't find App ID button.");
}

function buttonClick() {
    const appIdInput = (<HTMLInputElement>document.getElementById("appIdInput")).value;
    if (appIdInput != null) {
        console.log(appIdInput);
    }
}
