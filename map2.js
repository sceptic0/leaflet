

const DISTANCE_BETWEEN = 10;

let length,
    map2 = L.map('map2').setView([53.430, -2.960], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

let initialCoords = [];
// let storedCoords = [];
let polyline = L.polyline(initialCoords).addTo(map2);
let towerCoord
let staticPoint

map2.on('click', function(e) {
  towerCoord = [e.latlng.lat, e.latlng.lng];
  L.marker(towerCoord).addTo(map2)
  initialCoords.push(towerCoord);
  console.log(initialCoords)
  // console.log(towerCoord)
})


function addToStorage() {
  localStorage.setItem("coords", JSON.stringify(initialCoords));
}

function initPolyline(){
  polyline.getLatLngs().forEach(function (latLng) {
    if(staticPoint) {
      L.marker(latLng).bindPopup('Distance from previous point: '  + staticPoint.distanceTo(latLng).toFixed(2)  + ' meter(s)').addTo(map2);
    }
  });
}


function getFromStorage() {
  let storedCoords = localStorage.getItem("coords", JSON.stringify(initialCoords));
  document.getElementById('localStorageList').innerHTML = storedCoords
  for( let t = 0; t < storedCoords.length; t++) {
  }
}


function getFromArr() {

  for( let t = 0; t < initialCoords.length; t++) {
    L.marker(initialCoords[t]).addTo(map2)
    console.log(initialCoords[t]);
  }
}




var data = [
  { "coords" : [ 53.529045, -2.985406 ]},
]

var pointA = new L.LatLng(53.409045, -2.985406);
var pointB;
let newCoord1 = []
let newCoord2 = []
let distance = null;
data.forEach(function(d) {
  pointB = new L.LatLng(d.coords[0], d.coords[1]);
  L.polyline([pointA, pointB]).addTo(map2);
  L.marker([d.coords[0], d.coords[1]], 10).addTo(map2);

  let poly = L.polyline([pointA, pointB]).addTo(map2)

  poly.getLatLngs().forEach(function (coord) {
    if (pointB) {
      L.marker(coord).bindPopup(
        'Distance from previous point: '
        + pointB.distanceTo(coord).toFixed(2)
        + ' meter(s)'
      ).addTo(map2);
    }

     distance = pointB.distanceTo(coord).toFixed(2);
    pointB = coord;
  });

  let copyData = data
  let steps = Math.ceil(distance / DISTANCE_BETWEEN)

  for (i = 0; i < steps; i++) {

    // first try 
    let earth = 6378.137  //radius of the earth in kilometer
    let pi = Math.PI
    let m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

    let new_latitude = copyData[0].coords[0] + (DISTANCE_BETWEEN * m);


    let cos = Math.cos
    m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

    let new_longitude = copyData[0].coords[1] + (DISTANCE_BETWEEN * m) / cos(copyData[0].coords[0] * (pi / 180));
    copyData[0].coords[0] = new_latitude
    copyData[0].coords[1] = new_longitude

    newCoord1.push(
      {
       x: new_latitude,
       y: new_longitude    
      }
    )

    // second try

   

    // number of km per degree = ~111km (111.32 in google maps, but range varies
     //  between 110.567km at the equator and 111.699km at the poles)
    // 1km in degree = 1 / 111.32km = 0.0089
    // 1m in degree = 0.0089 / 1000 = 0.0000089
    let coef = DISTANCE_BETWEEN * 0.0000089;

    let new_lat = copyData[0].coords[0] + coef;

    // pi / 180 = 0.018
    let new_long = copyData[0].coords[1] + coef / Math.cos(copyData[0].coords[0] * 0.018);


     copyData[0].coords[0] = new_lat
      copyData[0].coords[1] = new_long

       newCoord2.push(
          {
           x: new_lat,
           y: new_long    
          }
        )
  }
});



console.log(newCoord1, 'b')
console.log(newCoord2, 'c')

// var coords = [];
//
// for (var i = 0; i < 3; i += 1) {
//   coords.push(getRandomLatLng());
// }
//
// var polyline2 = L.polyline(coords).addTo(map2);
// var previousPoint;
// // var previousPoint = {'lat': 53.55, 'lng': -2.99}
//
// console.log(polyline2)
//
// polyline2.getLatLngs().forEach(function (latLng) {
//   if (previousPoint) {
//     L.marker(latLng).bindPopup(
//       'Distance from previous point: '
//       + previousPoint.distanceTo(latLng).toFixed(2)
//       + ' meter(s)'
//     ).addTo(map2);
//   }
//
//   // console.log(latLng)
//   previousPoint = latLng;
// });
//
// function getRandomLatLng() {
//   return [
//     53.4 + 0.1 * Math.random(),
//     -2.96 + 0.2 * Math.random()
//   ];
// }



// var coords2 = [];
//
// for (var i = 0; i < 10; i += 1) {
//   coords2.push(getRandomLatLng());
// }
//
//
// function getRandomLatLng() {
//   return [
//     48.8 + 0.1 * Math.random(),
//     2.25 + 0.2 * Math.random()
//   ];
// }
//
// console.log(coords2)

// let pointsArr = [];
// let
//   firstLatLng,
//   firstPoint,
//   secondLatLng,
//   secondPoint,
//   distance,
//   length,
//   polyline
//   map2 = L.map('map2').setView([53.430, -2.960], 13);
//
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map2);

// // add listeners to click, for recording two points
// map2.on('click', function(e) {
//   if (!firstLatLng) {
//     firstLatLng = e.latlng;
//     firstPoint = e.layerPoint;
//     L.marker(firstLatLng).addTo(map2).bindPopup('Point A<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
//   } else {
//     secondLatLng = e.latlng;
//     secondPoint = e.layerPoint;
//     L.marker(secondLatLng).addTo(map2).bindPopup('Point B<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
//   }
//
//   if (firstLatLng && secondLatLng) {
//     // draw the line between points
//     L.polyline([firstLatLng, secondLatLng], {
//       color: 'red'
//     }).addTo(map2);
//     console.log(L.polyline.getLatLngs())
//     // refreshDistanceAndLength();
//   }
//
// })
//
// map2.on('zoomend', function(e) {
//   refreshDistanceAndLength();
// })
//
// function refreshDistanceAndLength() {
//   distance = L.GeometryUtil.distance(map2, firstLatLng, secondLatLng);
//   length = L.GeometryUtil.length([firstPoint, secondPoint]);
//   console.log(distance);
//   console.log(length);
// }
