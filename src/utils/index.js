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

/**
 * function for getting json from server
 * @param {string} url - server url address
 * @param {callback} callback
 * @returns {void} void
 */
export function loadJSON(url, callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange =  () => {
     if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
     }
  };
  xobj.send(null);  
}
