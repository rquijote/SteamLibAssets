declare const JSZip: any;

export default async function downloadAssets(appId: number) {
  try {
    const assetsToDownload: { url: string; name: string }[] = [];

    // Add images from DOM
    const imgs = document.getElementsByClassName("downloadImg");

    // Check if there is a checkbox after the image, and if its checked.
    // Push to urls.
    for (const el of imgs) {
      if (!(el instanceof HTMLImageElement)) continue;
      const next = el.nextElementSibling;
      if (
        next &&
        next instanceof HTMLInputElement &&
        next.type === "checkbox" &&
        next.checked
      ) {
        assetsToDownload.push({ url: el.src, name: `${el.alt}.png` });
      }
    }

    if (!assetsToDownload.length) {
      alert("No assets found for download.");
      return;
    }

    // Fetch blobs
    const blobs = await Promise.all(
      assetsToDownload.map(async (downloadAsset) => {
        const queryUrl = new URL("http://localhost:5062/api/assets/proxy");
        // safely encode URL as query parameter (issues with .png, .jpeg, etc.)
        queryUrl.searchParams.set("url", downloadAsset.url);

        const res = await fetch(queryUrl.toString());
        if (!res.ok)
          throw new Error(`Failed to fetch image at ${downloadAsset.url}`);
        return res.blob();
      })
    );

    // Zip with JSZip
    const zip = new JSZip();
    blobs.forEach((blob, index) => {
      const name = assetsToDownload[index]?.name || `asset${index}.png`;
      zip.file(name, blob);
    });

    const zipFile = await zip.generateAsync({ type: "blob" });
    downloadZip(zipFile, `${appId}-assets.zip`);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download assets. See console for details.");
  }
}

// Need to create <a> element for download.
function downloadZip(file: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}
