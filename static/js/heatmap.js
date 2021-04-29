//=====================
//start page load with map layer
// const tile = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/light-v10",
//   // layers: [baseMaps, ]
//   accessToken: API_KEY
// });
// const baseMaps = {
//   "Portland Map": tile
// };
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
const census = "/api/censusdata/"
const neighborhoodURL = "https://opendata.arcgis.com/datasets/9f50a605cf4945259b983fa35c993fe9_125.geojson"
const treesURL = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson"

// Grab data with d3 promise

Promise.all([d3.json(neighborhoodURL), d3.json(treesURL), d3.json(census)]).then(([neighborhoods, trees, ucb]) => {

  // console.log(neighborhoods)
  // console.log(trees)
  // console.log(ucb);
  // console.log(trees.features[0].properties);

  const markers = L.markerClusterGroup();
  for (let i = 0; i < trees.features.length; i++) {
    const location = trees.features[i].properties;
    // console.log(location)
    if (location.LAT) {
      markers.addLayer(L.marker([location.LAT, location.LON])
        .bindPopup(`<br><strong>Year Designated: </strong>${location.YEAR_Designated}</br>\
        <br><strong>Spread: </strong>${location.SPREAD} feet</br>\
        <br><strong>Diameter: </strong>${location.DIAMETER} feet</br>\
        <br><strong>Height: </strong> ${location.HEIGHT} feet</br>\
        <br><strong>Details: </strong>${location.NOTES}</br>`));
    }
  }
  const map = L.map("map", {
    center: [45.5051, -122.6754],
    zoom: 12,
    maxZoom: 15
    // layers: [tile, markers, homes]
  });

  const tile = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
  map.addLayer(tile);

  // console.log(location);
  // console.log(heatArray);
  map.addLayer(markers)
  L.geoJson(neighborhoods, {
    style: function (feature) {
      return {
        color: "white",
        fillColor: "lightblue",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    onEachFeature: function (feature, layer) {
      layer.on({
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        click: function (event) {
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
  //empty arrays to push data to
  const zip = [];
  const medianIncome = [];
  const medianAge = [];
  const medianHome = [];
  const population = [];
  const bachelorsRate = [];
  const mastersRate = [];
  const city = [];
  const latCensusArray = [];
  const longCensusArray = [];

  for (let i = 0; i < ucb.length; i++) {
    zip.push(ucb[i].Zipcode)
    medianIncome.push(ucb[i].MedianHouseholdIncome)
    medianAge.push(ucb[i].MedianAge)
    medianHome.push(ucb[i].MedianHomeValue)
    population.push(ucb[i].Population)
    bachelorsRate.push(ucb[i].BachelorsRate)
    mastersRate.push(ucb[i].MastersRate)
    city.push(ucb[i].City)
    latCensusArray.push(ucb[i].Lat)
    longCensusArray.push(ucb[i].Lng)

  }
  console.log(latCensusArray);
  console.log(longCensusArray);
  // ==================================
  // High chart plotting

  let yearDesignated = []

  for (let i = 0; i < trees.features.length; i++) {
    const designation = trees.features[i].properties.YEAR_Designated;
    // console.log(designation)

    if (designation) {
      yearDesignated.push(designation)
    }
  }
  console.log(yearDesignated)

  let sortedYearDes = yearDesignated.sort((a, b) => a - b);
  // console.log(sortedYearDes)
  let counts = {};

  for (var i = 0; i < sortedYearDes.length; i++) {
    var num = sortedYearDes[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  //   console.log(counts);

  let designationYear = Object.keys(counts);
  let treeCount = Object.values(counts);

  console.log(designationYear);
  console.log(treeCount);

  Highcharts.chart('chart1', {
    colors: ["#4b734e"],
    chart: {
      type: 'column'
    },
    title: {
      text: 'Heritage Trees Designated by Year'
    },
    subtitle: {
      text: 'Source: Portland Open Data'
    },
    xAxis: {
      categories: designationYear,
      crosshair: true,
      title: {
        text: "Year Designated"
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Trees Designated'
      }
    },
    tooltip: {
      formatter: function () {
        return '<strong>' + this.x +
          '</strong>: <p>' + this.y + '</p>';
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },

    series: [{
      showInLegend: false,
      data: treeCount
    }]
  });

  // console.log(zip);
  console.log(medianHome);
  Highcharts.chart('chart2', {
    chart: {
      type: 'column',
    },

    title: {
      text: 'Portland Median Home Value by Zip Code, 2019'
    },

    subtitle: {
      text: 'Source: U.S. Census Bureau'
    },

    yAxis: {
      title: {
        text: 'Median Home Value'
      }
    },

    xAxis: {
        categories: zip,
        crosshair: true,
      accessibility: {
        rangeDescription: 'Zipcode'
    },
    title: {
      text: 'Zipcode'
    }
    },

    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x}, ${point.y} '
        }
      }
    },

    series: [{
      name: 'Median Home Value',
      color: 'rgba(223, 83, 83, .5)',
      data: medianHome
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  })
  Highcharts.chart('chart4', {
    chart: {
      type: 'column',
    },

    title: {
      text: 'Portland Median Income by Zip Code, 2019'
    },

    subtitle: {
      text: 'Source: U.S. Census Bureau'
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Median Income ($)'
      }
    },

    xAxis: {
      categories: zip,
      crosshair: true,
      title: {
        text: 'Zipcode'
      }
    },


    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Median Income',
      color: 'rgba(223, 83, 83, .5)',
      data: medianIncome
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  })
  // ===========================
  // Adding Median Income circles to map
  // create a function to choose a different color based on median home value
  function chooseColor(home_value) {
    switch (true) {
      case home_value > 700000: return "#c7ea46";
      case home_value > 600000: return "#fce205";
      case home_value > 500000: return "#ffbf00";
      case home_value > 400000: return "#fda50f";
      case home_value > 300000: return "#f64a8a";
      case home_value < 300000: return "#b90f0a";
    };
  }
  // create city circles
  const value = []

  for (let i = 0; i < medianHome.length; i++) {
    value.push(
      L.circle([latCensusArray[i], longCensusArray[i]], {

      fillColor: chooseColor(medianHome[i]),
      radius: Math.sqrt(medianHome[i]),
      fillOpacity: 10,
      stroke: true,
      weight: 0.5,
      color: "black"
    }).bindPopup("<h5> Median Home Value: " + medianHome[i] + "</h5>"))

  };




  console.log(value);
  const homes = L.layerGroup(value);
  map.addLayer(homes);
  // Create overlay object to hold our overlay layer
  const overlayMaps = {
    "Tree Markers": markers,
    "Home Values": homes
  };

  // const map = L.map("map", {
  //   center: [45.5051, -122.6754],
  //   zoom: 12,
  //   layers: [tile, markers, homes]
  // });

  // create a legend in the bottom right corner (with the help of my tutor David Pecot)
  var legend = L.control({
    position: 'bottomright',
    fillColor: 'white'
  });


legend.onAdd = function () {
  var div = L.DomUtil.create("div", "info legend");
  var grades = [700000, 600000, 500000, 400000, 300000, 200000];
  var color = ['#c7ea46', '#fce205', '#ffbf00', '#fda50f', '#f64a8a', '#b90f0a'];

  div.innerHTML += "<div style='font-weight: 600; text-align:center;'>Home Value</div>";
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      "<div style='background: " + color[i] + "; text-align: center; padding: 1; border: 1px solid grey; min-width: 80px;'>"
      + grades[i] + (grades[i - 1] ? "&ndash;" + grades[i - 1] + "</div>" : "></div>");
      // + grades[i] ; "</div>";
  }
  return div;


  }

  legend.addTo(map)

  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
});
