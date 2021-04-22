const heatMap = L.map("heatmap", {
  center: [45.5051, -122.6754],
  zoom: 13
});
const baseMaps = {
   "Heat Map": heatMap
 };

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  // layers: [baseMaps, ]
  accessToken: API_KEY
}).addTo(heatMap);

// L.control.layers(baseMaps, {
//     collapsed: false
// }).addTo(heatMap);
const url = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson";
// const url= "api/heatmapdata"
d3.json(url).then(response => {

  console.log(response);
console.log(response.features[0].properties);
  const heatArray = [];

  for (let i = 0; i < response.features.length; i++) {
    const location = response.features[i].properties;
    // console.log(location)
    if (location.LAT) {
      heatArray.push([location.LAT, location.LON]);
    }
}
  // console.log(location);
console.log(heatArray);

// response.features.forEach(feature => {
//     const lat = feature.properties.LAT;
//     const long= feature.properties.LON;
//     console.log(lat);
//     console.log(long);
// }
// )
// setTimeout(function(){
//     // can assign to const heat
//      L.heatLayer(heatArray, {
//       radius: 20,
//       blur: 15
//   }).addTo(heatMap)
// },9500);

L.heatLayer(heatArray, {
      radius: 20,
      blur: 25
  }).addTo(heatMap);
});
