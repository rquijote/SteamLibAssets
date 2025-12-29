export default async function downloadAsset(url: string, fileName: string) {
  const queryUrl = new URL("http://localhost:5062/api/assets/proxy");
  queryUrl.searchParams.set("url", url);
  const res = await fetch(queryUrl.toString());
  if (!res.ok) throw new Error(`Failed to fetch image at ${url}`);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = `${fileName}.png`;
  a.click();

  URL.revokeObjectURL(objectUrl);
}
