// Creating map object
var map = L.map("map", {
    center: [0, 0], //[37.0902, -95.7129],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
  }).addTo(map);
  

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var link2= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson" //serious events
var link3 ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson" //7 days 1.5+
var link4 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"  //past day all earthquakes


function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "<p><p>Date: " + new Date(feature.properties.time));
}


function setRadius(mag){

  switch(true){
    case (mag < 3.5):
      //console.log("Yes")
      return 5;
      break;
    case (mag < 5.5):
      //console.log("Yes2")
      return 10;
      break;
    case (mag < 7.5):
      //console.log("Yes3")
      return 15;
      break;
    case (mag <= 9.5):
      //console.log("Yes4")
      return 20;
      break;
    default:
      //console.log("Yes5")
      return 25;
  }
}

function setColor(mag){

  switch(true){
    case (mag <= 1):
      return "#FEBA05";
      break;
    case (mag <= 2):
      return "#FCA102";
      break;
    case (mag <= 3):
      return "#EF8000";
      break;
    case (mag <= 4):
      return "#FA0C08";
      break;
    case (mag <= 5):
      return "#E00001";
      break;
    default:
      return "#C80004"
  }
}

// -----------------------------------/* source: https://leafletjs.com/examples/choropleth/ */-----------------------------------//

var legend = L.control({position: 'bottomright'});
 
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + setColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// ----------------------------------------------------------------------------------------------------------------------------------------//

d3.json(link4, earthquakeData =>{
  console.log(earthquakeData);
  // L.geoJSON(earthquakeData).addTo(map)

  console.log(earthquakeData.features[0].properties.mag);

  console.log(setRadius(earthquakeData.features[0].properties.mag));

  L.geoJson(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      //return L.circleMarker(latlng, geojsonMarkerOptions)
      
      return L.circleMarker(latlng, {
        radius: setRadius(feature.properties.mag),
        fillColor: setColor(feature.properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
      })
    },

    onEachFeature: onEachFeature

  }).addTo(map)
})
