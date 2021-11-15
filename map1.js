
// ex1

let layerOsm = new L.TileLayer ('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {subdomains:['server','services'], maxZoom:19, noWrap:false, attribution:'<a href="https://www.arcgis.com/">ArcGIS</a>' });

let map1 = new L.Map ('map1').addLayer (layerOsm).setView (new L.LatLng(48, 0), 4);

let marker = L.circleMarker();

let polylineMeasure = L.control.polylineMeasure ({
  position:'topleft',
  unit:'kilometres',
  showBearings:true,
  clearMeasurementsOnStop: false,
  showClearControl: true,
  showUnitControl: true
})
polylineMeasure.addTo (map1);

// console.log('aaaaa', polylineMeasure)

function debugevent(e) {
  console.debug(e.type, e, polylineMeasure._currentLine)
}

L.control.scale ({
  maxWidth:240,
  metric:true,
  imperial:false,
  position: 'bottomleft'
}).addTo (map1);

map1.on('polylinemeasure:toggle', debugevent);
map1.on('polylinemeasure:start', debugevent);
map1.on('polylinemeasure:resume', debugevent);
map1.on('polylinemeasure:finish', debugevent);
map1.on('polylinemeasure:change', debugevent);
map1.on('polylinemeasure:clear', debugevent);
map1.on('polylinemeasure:add', debugevent);
map1.on('polylinemeasure:insert', debugevent);
map1.on('polylinemeasure:move', debugevent);
map1.on('polylinemeasure:remove', debugevent);

// map1.on('click', function(e) {
//   console.log(L.marker(e.latlng));
// })
