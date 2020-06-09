  function createMarkers(response, date) {
    console.log(`CreateMarkers...`);
    // Pull the "stations" property off of response.data
    var records = response.data;
    //console.log(records.length);
    var filteredRecords = records.filter(d => d.Date == date);
    //console.log(filteredRecords.length);
  
    // Initialize an array to hold bike markers
    var aqiMarkers = [];
  
    // Loop through the cities array
    for (var index = 0; index < filteredRecords.length; index++) {
      var city = filteredRecords[index];
      //aqiHeat.push([city.Lat, city.Lng, city.AQI]);
      // For each station, create a marker and bind a popup with the station's name
      var cityLoc = L.circleMarker([city.Lat, city.Lng],{
        color: "black",
        weight: 1,
        fillColor: getColor(city.Category),
        radius: city.AQI/5,
        fillOpacity: .8
      })
        .bindPopup("<h3>" + city.City +"</h3> "+ city.State + "<h3>"+city.Date+"<h4><b>Population: </b>" + city.Population +
                     "</h4><h4><b>AQI: </b>" +city.AQI + "<b> - ("+ city.Category + ")</b>" +
                     "<h4><b>Business Closure Date: </b>" + city.initial_business_closure);
  
      // Add the marker to the aqiMarkers array
      aqiMarkers.push(cityLoc);
    }
    //console.log(aqiMarkers);

    aqiMarkers.forEach(function(item){
      item.on('click', function(e){
        buildCharts(response, e.target._popup._contentNode.firstElementChild.innerText);
      })
    });
    console.log(aqiMarkers);
    // Create a layer group made from the bike markers array, pass it into the createMap function
    // createMap(L.layerGroup(aqiMarkers));
  
  
  function buildCharts(response, city) {
    console.log(response.data);
    //Use D3 to retrieve data from json file
    //d3.json("records.json").then(function(response) {
        //set a date variable for the xaxis by filtering the data by 'Date'
        //set a dailyAQI variable for the y-axis by filtering the data by 'AQI'
        var oneCity = response.data.filter(d => d.City === city);
        console.log("City data: " + oneCity);
        var dateX = oneCity.map(d => d.Date);
        //dateX = convertDate(dateX);
        console.log(dateX);
        var dailyAQI = oneCity.map(d => d.AQI);
        
        //Define a variable for the city shutdown date and AQI for the date
        //var shutdownDate = oneCity.map(d => d.initial_business_closure);
        //var shutdownAQI = shutdownDate.map(d => d.AQI);
        
        //var oneDate = dailyAQI.map(d => d.Date);
        console.log(`Create data for ${city}`);

    trace1 = {
      x: dateX,
      y: dailyAQI,
      text: dateX,
      type: "scatter",
      mode: "lines+markers"
      //marker: { size: 12 }
    };
  
    var data = [trace1];

        var layout = {
          title: `Daily AQI for ${city}`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 20
          },
          xaxis: {
            type: "Date"
          },
          annotations: [
            {
              x: "2020-03-09",
              y: 48,
              xref: 'x',
              yref: 'y',
              text: 'Nonessential Buisnesses Shutdown',
              showarrow: true,
              arrowhead: 3,
              ax: 70,
              ay: -140
            }
          ]
        };

        //Create scatter plot in the id="scatter" div
        Plotly.newPlot("scatter", data, layout);
  };
    // Create a layer group made from the city markers array, pass it into the createMap function
    var group = L.layerGroup(aqiMarkers);
    return group;
  }
  
  function getColor(category){
    switch (category) {
        case "Good":
            return "green";
        case "Moderate":
            return "yellow";
        case "Unhealthy for Sensitive Groups":
            return "orange";
        case "Unhealthy":
            return "red";
        case "Very Unhealthy":
            return "purple";
        case "Hazardous":
            return "maroon"   
        default:
            return "silver";
    }
}

function createHeatmaps(response, date) {
  filteredRecords = response.data.filter(d=> d.Date == date);
  
  var heatData = {
    'max': 300,
    'data': []
    };
  console.log(`Creating heatmaps...`);
  for (var i = 0; i < filteredRecords.length; i++){
  city = filteredRecords[i];
  //console.log(`City: ${city.City}, Lat: ${city.Lat}, Lng: ${city.Lng}, AQI: ${city.AQI}`);
  //Add city data to data dict for heatmap
  heatData.data.push({'lat':city.Lat, 'lng': city.Lng,'count':city.AQI, 'radius': city.AQI/100});
}
//console.log(heatData);
      
//Set config parameters for heatmap. See: https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html
//Radius is set to AQI level of each city divided by 100
var cfg ={
  "radius": 'radius',
  "maxOpacity": .8,
  "scaleRadius":true,
  "useLocalExtrema": true
  };

//Create new heatmap layer and add to maps
var heatmapLayer = new HeatmapOverlay(cfg).addTo(map);
//Update map with heatmap data dict
heatmapLayer =heatmapLayer.setData(heatData);

return heatmapLayer;
}


  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("records.json").then( response=>{
      console.log(response.data.length);

      //createBaseMap();
       // Create the map object with options
    // map = L.map("map-id", {
    //   center: [37.09, -95.71],
    //   zoom: 5,
    //   });

    //   // map.createPane('left');
    //   // map.createPane('right');
    //   // map.getPane('left').style.zIndez =650;
    //   // map.getPane('right').style.zIndez =650;

    //   // Create the tile layer that will be the background of our map
    // var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "light-v10",
    //   accessToken: api_key,
    //   //pane: 'left'
    //   }).addTo(map);
    
      var data2019 = createMarkers(response, "2019-03-31");
      console.log(data2019);
      var records = response.data;
    //console.log(records.length);
    var filteredRecords = records.filter(d => d.Date == "2019-03-31");

      var heatData = {
        'max': 300,
        'data': []
    };
    console.log(`Creating heatmaps...`);
    for (var i = 0; i < filteredRecords.length; i++){
      city = filteredRecords[i];
      //console.log(`City: ${city.City}, Lat: ${city.Lat}, Lng: ${city.Lng}, AQI: ${city.AQI}`);
      //Add city data to data dict for heatmap
      heatData.data.push({'lat':city.Lat, 'lng': city.Lng,'count':city.AQI, 'radius': city.AQI/100});
    }
    console.log(heatData);
          
    //Set config parameters for heatmap. See: https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html
    //Radius is set to AQI level of each city divided by 100
    var cfg ={
      "radius": 'radius',
      "maxOpacity": .8,
      "scaleRadius":true,
      "useLocalExtrema": true
      };
    
    //Create new heatmap layer and add to maps
    var heatmap2019 = new HeatmapOverlay(cfg);
    //Update map with heatmap data dict
    heatmap2019.setData(heatData);
    
    var side2019 = L.layerGroup([data2019, heatmap2019]);

    var data2020 = createMarkers(response, "2020-03-31");
      console.log(data2020);
    filteredRecords = records.filter(d => d.Date == "2020-03-31");
     heatData = {
      'max': 300,
      'data': []
  };
  console.log(`Creating heatmaps...`);
  for (var i = 0; i < filteredRecords.length; i++){
    city = filteredRecords[i];
    //console.log(`City: ${city.City}, Lat: ${city.Lat}, Lng: ${city.Lng}, AQI: ${city.AQI}`);
    //Add city data to data dict for heatmap
    heatData.data.push({'lat':city.Lat, 'lng': city.Lng,'count':city.AQI, 'radius': city.AQI/100});
  }
  console.log(heatData);
        
  //Set config parameters for heatmap. See: https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html
  //Radius is set to AQI level of each city divided by 100
  var cfg ={
    "radius": 'radius',
    "maxOpacity": .8,
    "scaleRadius":true,
    "useLocalExtrema": true
    };
  
  //Create new heatmap layer and add to maps
  var heatmap2020 = new HeatmapOverlay(cfg);
  //Update map with heatmap data dict
  heatmap2020.setData(heatData);
  
  var side2020 = L.layerGroup([data2020,heatmap2020]);
      
     

     console.log("Create Maps...");
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: api_key,
      //pane: 'left'
      });

     var baseMaps = {
      "Light Map": lightmap,
     };

    var overlayMaps = {
      "2019": side2019,
      "2020": side2020
      //"Heatmap": heat
      };
      console.log("map object");
    var map = L.map("map-id", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [lightmap]
      });

      
    
  
    
      console.log("Adding Control Layers");
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);

    L.easyPrint({
      title: 'Print',
      position: 'bottomright',
      sizeModes: ['Current','A4Portrait', 'A4Landscape'],
      exportOnly: true
    }).addTo(map);
    


      
      
      });