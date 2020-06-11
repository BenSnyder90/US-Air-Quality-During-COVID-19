// var splitmap = L.map("split").setView([23.140, -101.887], 5);

//       splitmap.createPane('left');
//       splitmap.createPane('right');

//       var heatmap2019 = 'assets/images/map2019.png';
//       imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
//       var leftLayer = L.imageOverlay(heatmap2019, imageBounds, {pane: 'left'}).addTo(splitmap);

//       var heatmap2020 = 'assets/images/map2020.png';
//       imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
//       var rightLayer = L.imageOverlay(heatmap2020, imageBounds, {pane: 'right'}).addTo(splitmap);

//       L.control.splitMap(leftLayer, rightLayer).addTo(splitmap);


      slider = new juxtapose.JXSlider('#split',
    [
        {
            src: 'assets/images/map2019.png',
            label: 'March 31, 2019 Heatmap by AQI level',
            
        },
        {
            src: 'assets/images/map2020.png',
            label: 'March 31, 2020 Heatmap by AQI level',
            
        }
    ],
    {
        animate: true,
        showLabels: true,
        showCredits: true,
        startingPosition: "50%",
        makeResponsive: true
    });