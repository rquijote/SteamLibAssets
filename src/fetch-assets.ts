async function getMainCapsule(appID: string) {
  // test is 237930
  const url = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/capsule_616x353.jpg`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await fetch(url);
    const blob = await result.blob();
    return blob;
  } catch (error: any) {
    console.error(error.message);
  }
}

export { getMainCapsule }