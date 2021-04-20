// Creating map object
var myMap = L.map("map", {
  center: [45.53, -122.6754],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Load in GeoJson data
// var geoData = "Neighborhoods_(Regions).geojson";

const queryURL = "https://opendata.arcgis.com/datasets/9f50a605cf4945259b983fa35c993fe9_125.geojson"

// TODO:

// Grab data with d3
d3.json(queryURL).then(data => {

console.log(data)

L.geoJson(data, {
  style: function(feature) {
    return{
      color: "white",
      fillColor:"lightblue",
      fillOpacity: 0.5,
      wieght: 1.5
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
        myMap.fitBounds(event.target.getBounds());
      }
    });
  layer.bindPopup(
    `<h4>${feature.properties.NAME}</h4>`
  );
  }
}).addTo(myMap);
});