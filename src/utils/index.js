/**
 * function for getting data from geotiff layer by point with lat and lng
 * @param {{lat: number, lng: number}} point - selected point on map
 * @param {GeotiffLayer} layer - GeotiffLayer
 * @returns {number} value {number} from layer
 */
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
  const data = raster.data[i];

  if (data !== undefined) {
    return data;
  } else {
    return null;
  }
};
