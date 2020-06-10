  function createMarkers(response, date) {
    console.log(`CreateMarkers...`);
    // Pull the "stations" property off of response.data
    var records = response.data;
    //Filter records based off of the date
    var filteredRecords = records.filter(d => d.Date == date);

  
    // Initialize an array to hold bike markers
    var aqiMarkers = [];
  
    // Loop through the cities array
    for (var index = 0; index < filteredRecords.length; index++) {

      //Store each city's records in a new variable
      var city = filteredRecords[index];
    
      // For each city, create a marker and bind a popup with the station's name
      var cityLoc = L.circleMarker([city.Lat, city.Lng],{
        color: "black",
        weight: 1,
        fillColor: getColor(city.Category),
        radius: city.AQI/5,
        fillOpacity: .8
      })
        .bindPopup("<h4><b>" + city.City +"</b></h4> "+ "<h5><b>State: </b>"+ city.State + "<h5><b>"+city.Date+"</b><h5><b>Population: </b>" + city.Population +
                     "<h5><b>AQI: </b>" +city.AQI + "<b> - ("+ city.Category + ")</b>" +
                     "<h5><b>Business Closure Date: </b>" + city.initial_business_closure
                     +"<br><div id ='scatter'></div>",{
                       keepInView: true,
                       minWidth: 700,
                       maxHeight: 300
                     });
  
      // Add the marker to the aqiMarkers array
      aqiMarkers.push(cityLoc);
    }
    
    //Run through the markers array and build a scatter plot on click of each marker
    aqiMarkers.forEach(function(item){
      item.on('click', function(e){
        buildCharts(response, e.target._popup._contentNode.firstElementChild.innerText);
      })
    });
  
  
  function buildCharts(response, city) {
    
        //set a date variable for the xaxis by filtering the data by 'Date'
        //set a dailyAQI variable for the y-axis by filtering the data by 'AQI'
        var oneCity = response.data.filter(d => d.City === city);
        
        //Map the date values for the X value
        var dateX = oneCity.map(d => d.Date);
        
        //Map the AQI values for the Y value
        var dailyAQI = oneCity.map(d => d.AQI);

        //Grab the shutdown date for the vertical line
        var shutdownDate = oneCity[0].initial_business_closure;
        //Grab the max AQI value for the city
        var maxAQI = Math.max.apply(Math,dailyAQI);
        console.log("Shutdown date: " +shutdownDate + " Max AQI: "+maxAQI);
        
        
        //var oneDate = dailyAQI.map(d => d.Date);
        console.log(`Create data for ${city}`);
    //Create trace for scatter plot using date and AQI values
    trace1 = {
      x: dateX,
      y: dailyAQI,
      text: dateX,
      type: "scatter",
      mode: "lines",
      name: "AQI"
    };
    //Create trace for vertical line showing the shutdown date
    trace2 = {
      x: [shutdownDate,shutdownDate],
      y: [0,maxAQI],
      text: "Business Shutdown Date",
      mode: "lines",
      hovertemplate: `<b>Shutdown Date:</b> ${shutdownDate}`,
      name: "Shutdown Date",
      line: {
        color: "red"
      }
    }
  
    var data = [trace1, trace2];

        var layout = {
          title: `<b>Daily AQI for ${city} from Jan 2019 to May 2020</b>`,
          automargin: true,
          height: "auto",
          width: "auto",
          
          xaxis: {
            range: ["2018-12-31", "2020-06-1"],
            title:{
              text: "<b>Date</b>"
            },
            type: "Date",
            },
          yaxis: {
            title: {
              text: "<b>Air Quality Index (AQI) Value</b>"
            }
          },
          showlegend: true,
          legend: {
            x: 0,
            xanchor: 'left',
            y: -.25
          }
         
        };

        //Create scatter plot in the id="scatter" div
        Plotly.newPlot("scatter", data, layout);
        
  };
    // Create a layer group made from the city markers array, pass it into the createMap function
    var group = L.layerGroup(aqiMarkers);
    return group;
  }
  

  //Get color function changes the marker based on the AQI Color Index of the given AQI value for each day
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


  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("records.json").then( response=>{
      console.log(response.data.length);

      //Create markers for March 31,2019
      var data2019 = createMarkers(response, "2019-03-31");
      
      //Create heatmaps for 2019 data
      var records = response.data;
    //console.log(records.length);
    var filteredRecords = records.filter(d => d.Date == "2019-03-31");

    //Create empty array for heatmap
      var heatData = {
        'max': 300,
        'data': []
    };

    //Run through the filtered data, storing lat/lng, AQI value as intensity, and AQI value divided by 100 to be used as radius for heatmap
    console.log(`Creating heatmaps...`);
    for (var i = 0; i < filteredRecords.length; i++){
      city = filteredRecords[i];
      //Add city data to data dict for heatmap
      heatData.data.push({'lat':city.Lat, 'lng': city.Lng,'count':city.AQI, 'radius': city.AQI/100});
    }
          
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
    
    //Create layer group of markers and heatmap
    var side2019 = L.layerGroup([data2019, heatmap2019]);
    
    //Create markers for March 31, 2020
    var data2020 = createMarkers(response, "2020-03-31");
      console.log(data2020);

    //Create heatmaps for March 31, 2020
    filteredRecords = records.filter(d => d.Date == "2020-03-31");
     heatData = {
      'max': 300,
      'data': []
  };
  console.log(`Creating heatmaps...`);
  for (var i = 0; i < filteredRecords.length; i++){
    city = filteredRecords[i];
    //Add city data to data dict for heatmap
    heatData.data.push({'lat':city.Lat, 'lng': city.Lng,'count':city.AQI, 'radius': city.AQI/100});
  }
        
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
  
  //Create layer group of 2020 markers and heatmap
  var side2020 = L.layerGroup([data2020,heatmap2020]);
      
     
    //Create the base map using Mapbox lightmap
     console.log("Creating Maps...");
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: api_key,
      });

      //Set lightmap to base map
     var baseMaps = {
      "Light Map": lightmap,
     };
     //Set the 2019 data and 2020 data as different overlay options
    var overlayMaps = {
      "<b>March 31, 2019</b>": side2019,
      "<b>March 31, 2020</b>": side2020
      };
      console.log("map object");
    var map = L.map("map-id", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [lightmap, side2019]
      });

    
     
    console.log("Adding Control Layers");
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);

    //Add easy print plugin used to save heatmap pictures as PNG for slider
    L.easyPrint({
      title: 'Print',
      position: 'bottomright',
      sizeModes: ['Current','A4Portrait', 'A4Landscape'],
      exportOnly: true
    }).addTo(map);
    

    /////////SLIDER MAP////////////
    //Create new map object used in split div
    var splitmap = L.map('split').setView([23.140, -101.887], 5);

    //Create left pane and right pane for slider
      splitmap.createPane('left');
      splitmap.createPane('right');

      //Set left pane to 2019 heatmap
      var heatmap2019 = 'assets/images/map2019.png',
      imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
      var leftLayer = L.imageOverlay(heatmap2019, imageBounds, {pane: 'left', alt: "2019 Heatmap"}).addTo(splitmap);

      //Set right pane to 2020 heatmap
      var heatmap2020 = 'assets/images/map2020.png',
      imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
      var rightLayer = L.imageOverlay(heatmap2020, imageBounds, {pane: 'right', alt: "2020 Heatmap"}).addTo(splitmap);

      //Add slider control to map
      L.control.splitMap(leftLayer, rightLayer).addTo(splitmap);
      
      
      });