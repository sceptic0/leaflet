

// ex3

  // Full list options at "leaflet-elevation.js"
var elevation_options = {

  // Default chart colors: theme lime-theme, magenta-theme, ...
  theme: "lightblue-theme",

  // Chart container outside/inside map container
  detached: true,

  // if (detached), the elevation chart container
  elevationDiv: "#elevation-div",

  // if (!detached) autohide chart profile on chart mouseleave
  autohide: false,

  // if (!detached) initial state of chart profile control
  collapsed: false,

  // if (!detached) control position on one of map corners
  position: "topright",

  // Autoupdate map center on chart mouseover.
  followMarker: true,

  // Autoupdate map bounds on chart update.
  autofitBounds: true,

  // Chart distance/elevation units.
  imperial: false,

  // [Lat, Long] vs [Long, Lat] points. (leaflet default: [Lat, Long])
  reverseCoords: false,

  // Acceleration chart profile: true || "summary" || "disabled" || false
  acceleration: false,

  // Slope chart profile: true || "summary" || "disabled" || false
  slope: false,

  // Speed chart profile: true || "summary" || "disabled" || false
  speed: false,

  // Display time info: true || "summary" || false
  time: false,

  // Display distance info: true || "summary"
  distance: true,

  // Display altitude info: true || "summary"
  altitude: true,

  // Summary track info style: "inline" || "multiline" || false
  summary: 'multiline',

  // Download link: "link" || false || "modal"
  downloadLink: 'link',

  // Toggle chart ruler filter
  ruler: true,

  // Toggle chart legend filter
  legend: true,

  // Toggle "leaflet-almostover" integration
  almostOver: true,

  // Toggle "leaflet-distance-markers" integration
  distanceMarkers: false,

  // Display track waypoints
  waypoints: true,

  // Custom waypoint icons (associative array of <sym> tags)
  wptIcons: {
    '': L.divIcon({
      className: 'elevation-waypoint-marker',
      html: '<i class="elevation-waypoint-icon"></i>',
      iconSize: [30, 30],
      iconAnchor: [8, 30],
    }),
  },

  // Render chart profiles as Canvas or SVG Paths
  preferCanvas: true

};

let layerOsm = new L.TileLayer ('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {subdomains:['server','services'], maxZoom:19, noWrap:false, attribution:'<a href="https://www.arcgis.com/">ArcGIS</a>' });

let map3 = new L.Map ('map3').addLayer (layerOsm).setView (new L.LatLng(48, 0), 4);

// Instantiate elevation control.
var controlElevation = L.control.elevation(elevation_options).addTo(map3);

// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
  controlElevation.load("demo.geojson");
