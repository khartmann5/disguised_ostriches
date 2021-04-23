const tile =  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  // layers: [baseMaps, ]
  accessToken: API_KEY
});
const baseMaps = {
   "Portland Map": tile
 };
// const neighborhoods = {
//     "Neighborhoods":
// }




const url = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson";
// const url= "api/heatmapdata"
d3.json(url).then(response => {

  console.log(response);
console.log(response.features[0].properties);
  const heatArray = [];
  const markers= L.markerClusterGroup();
  for (let i = 0; i < response.features.length; i++) {
    const location = response.features[i].properties;
    // console.log(location)
    if (location.LAT) {
      markers.addLayer(L.marker([location.LAT, location.LON]).bindPopup(`<strong>Notes:</strong>${response.features[i].properties.NOTES}`));
    }
}
  // console.log(location);
// console.log(heatArray);
map.addLayer(markers)
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

// L.heatLayer(heatArray, {
//       radius: 20,
//       blur: 25
//   }).addTo(heatMap);
});
const neighborhoodURL = "https://opendata.arcgis.com/datasets/9f50a605cf4945259b983fa35c993fe9_125.geojson"
const treesURL = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson"

// Grab data with d3
// const neigh=
Promise.all([d3.json(neighborhoodURL), d3.json(treesURL)]).then(([neighborhoods, trees]) => {

console.log(neighborhoods)
console.log(trees)

 L.geoJson(neighborhoods, {
  style: function(feature) {
    return{
      color: "white",
      fillColor:"lightblue",
      fillOpacity: 0.5,
      weight: 1.5
    };
  },
  onEachFeature: function(feature, layer) {
    layer.on({
      mouseover: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity:0.9
        });
      },
      mouseout: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.5
        });
      },
      click: function(event) {
        map.fitBounds(event.target.getBounds());
      }
    });
  layer.bindPopup(
    `<h4>${feature.properties.NAME}</h4>`
  );
  },
  }
).addTo(map)
// .addTo(map)
});

const map= L.map("heatmap", {
 center: [45.5051, -122.6754],
 zoom: 12,
 layers: tile
});

// const neighbors = {
//     "Neighborhoods": neigh
// }
L.control.layers(baseMaps).addTo(map);
