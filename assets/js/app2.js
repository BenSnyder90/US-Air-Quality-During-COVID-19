var map = L.map('map-id').setView([23.140, -101.887], 5);

      map.createPane('left');
      map.createPane('right');

      var newark = 'map2019.png',
      imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
      var leftLayer = L.imageOverlay(newark, imageBounds, {pane: 'left'}).addTo(map);

      var atlantis = 'map2020.png',
      imageBounds = [[7.9409, -131.1589], [29.2144, -82.6558]];
      var rightLayer = L.imageOverlay(atlantis, imageBounds, {pane: 'right'}).addTo(map);

      L.control.splitMap(leftLayer, rightLayer).addTo(map);