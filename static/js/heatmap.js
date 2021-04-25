//=====================
//start page load with map layer 
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
// deprecated try to call using multiple files
//const neighborhoods = {
//     "Neighborhoods":
// }

// troubleshooting for CORS error
// setTimeout(function(){
//     // can assign to const heat
//      L.heatLayer(heatArray, {
//       radius: 20,
//       blur: 15
//   }).addTo(heatMap)
// },9500);
// =====================
// declare API url links for promise
const census= "/api/censusdata/"
const neighborhoodURL = "https://opendata.arcgis.com/datasets/9f50a605cf4945259b983fa35c993fe9_125.geojson"
const treesURL = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson"

// Grab data with d3
// const neigh=
Promise.all([d3.json(neighborhoodURL), d3.json(treesURL), d3.json(census)]).then(([neighborhoods, trees, ucb]) => {

console.log(neighborhoods)
console.log(trees)
console.log(ucb);
console.log(trees.features[0].properties);

const markers= L.markerClusterGroup();
for (let i = 0; i < trees.features.length; i++) {
  const location = trees.features[i].properties;
  // console.log(location)
  if (location.LAT) {
    markers.addLayer(L.marker([location.LAT, location.LON])
    .bindPopup(`<br><strong>Year Designated: </strong>${trees.features[i].properties.YEAR_Designated}</br>\
        <br><strong>Spread: </strong>${trees.features[i].properties.SPREAD} feet</br>\
        <br><strong>Diameter: </strong>${trees.features[i].properties.DIAMETER} feet</br>\
        <br><strong>Height: </strong> ${trees.features[i].properties.HEIGHT} feet</br>\
        <br><strong>Details: </strong>${trees.features[i].properties.NOTES}</br>`));
  }
}
// console.log(location);
// console.log(heatArray);
map.addLayer(markers)
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

const map= L.map("map", {
 center: [45.5051, -122.6754],
 zoom: 12,
 layers: tile
});

// const neighbors = {
//     "Neighborhoods": neigh
// }
L.control.layers(baseMaps).addTo(map);
