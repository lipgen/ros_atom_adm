export const getDataFromLayer = (point, layer) => {
  if (!layer || !layer.leafletElement) return null;

  const { lat, lng } = point;
  const raster = layer.leafletElement.raster;
  const rasterBounds = layer.leafletElement._rasterBounds;
  if (!lat || !lng || !raster || !rasterBounds) return null;
  const x = Math.floor(
    (raster.width * (lng - rasterBounds._southWest.lng)) /
      (rasterBounds._northEast.lng - rasterBounds._southWest.lng)
  );
  const y =
    raster.height -
    Math.ceil(
      (raster.height * (lat - rasterBounds._southWest.lat)) /
        (rasterBounds._northEast.lat - rasterBounds._southWest.lat)
    );
  const i = y * raster.width + x;
  console.log(x, y, i);
  const data = raster.data[i];
  console.log("data", data);
  if (data !== undefined) {
    return data;
  } else {
    return null;
  }
};
