var map = L.map('split').setView([23.140, -101.887], 5);

      map.createPane('left');
      map.createPane('right');

      var heatmap2019 = 'assets/images/map2019.png',
      imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
      var leftLayer = L.imageOverlay(heatmap2019, imageBounds, {pane: 'left'}).addTo(map);

      var heatmap2020 = 'assets/images/map2020.png',
      imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
      var rightLayer = L.imageOverlay(heatmap2020, imageBounds, {pane: 'right'}).addTo(map);

      L.control.splitMap(leftLayer, rightLayer).addTo(map);
