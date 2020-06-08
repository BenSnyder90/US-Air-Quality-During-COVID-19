function createMap(aqiData) {
    console.log("Create Maps...");
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: api_key
    });
    //var heat = L.heatLayer(aqiHeat).addTo(map);
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "City": aqiData,
      //"Heatmap": heat
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [lightmap, aqiData]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);

    
  }
  
  function createMarkers(response) {
    console.log(`CreateMarkers...`);
    // Pull the "stations" property off of response.data
    var records = response.data;
    console.log(records.length);
    var filteredRecords = records.filter(d => d.Date == "2020-05-01" );
    console.log(filteredRecords.length);
  
    // Initialize an array to hold bike markers
    var aqiMarkers = [];
    var aqiHeat = []
  
    // Loop through the stations array
    for (var index = 0; index < filteredRecords.length; index++) {
      var city = filteredRecords[index];
      aqiHeat.push([city.Lat, city.Lng, city.AQI]);
      // For each station, create a marker and bind a popup with the station's name
      var cityLoc = L.marker([city.Lat, city.Lng])
        .bindPopup("<h3>" + city.City + "<h3><h3>Population: " + city.Population + "</h3><h3>AQI: " +city.AQI).openPopup();


      // Add the marker to the bikeMarkers array
      aqiMarkers.push(cityLoc);

    }
    aqiMarkers.forEach(function(item){
      item.on('click',function(e){
        buildCharts(response, e.target._popup._contentNode.firstElementChild.innerText);
      })
  });
    console.log(aqiMarkers);
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(aqiMarkers));
  }
  
  function buildCharts(response, city) {

    //Use D3 to retrieve data from json file
    //d3.json("records.json").then(function(response) {
        //set a date variable for the xaxis by filtering the data by 'Date'
        //set a dailyAQI variable for the y-axis by filtering the data by 'AQI'
        var oneCity = response.data.filter(d => d.City === city);
        var dateX = oneCity.map(d => d.Date);
        var dailyAQI = oneCity.map(d => d.AQI);
        
        //Define a variable for the city shutdown date and AQI for the date
        //var shutdownDate = oneCity.map(d => d.initial_business_closure);
        //var shutdownAQI = shutdownDate.map(d => d.AQI);
        
        //var oneDate = dailyAQI.map(d => d.Date);
        console.log(oneCity);

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
          annotations: [
            {
              x: "2020-03-09",
              y: 48,
              xref: 'x',
              yref: 'y',
              text: 'Nonessential Buisness Shutdown Date',
              showarrow: true,
              arrowhead: 3,
              ax: 50,
              ay: -75
            }
          ]
        };

        //Create scatter plot in the id="scatter" div
        Plotly.newPlot("scatter", data, layout);
  };

  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("records.json").then( response=>{
      console.log(response.data.length);
      createMarkers(response);
  });