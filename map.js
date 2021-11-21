
var map = L.map('map').setView([-29.25,-60.43], 8); 

// Agregar Google Hibrido como mapa base
var osmLayer =  L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);

// Crear una red de iconos con logos de lluvias
var redMarker = L.icon({
    color :'red',
    iconUrl:'cloud-showers-heavy-solid.svg',
    iconSize:[40,47]
})
// L.marker([-29.3,-60.4], {icon:redMarker}).addTo(map)
// Función para generar un cartel al hacer click en el pluviometro
function popUpInfo(feature, layer) {
    if (feature.properties && feature.properties.Name) {
        layer.bindTooltip(feature.properties.Name, {
            interactive: true,
            permanent: false,
            opacity: 1,
            direction: 'top',
            className: 'popup',
        });
        layer.setIcon(redMarker)
    }
}

// Agregar departamentos al mapa
L.geoJson(Departamentos, {
    fillOpacity: 0.00001,
    color: 'white',
    dashArray: '3',
}).addTo(map);

// Agregar el GeoJson al mapa
L.geoJson(RedPlu, {
    onEachFeature: popUpInfo,
    fillOpacity:0.1
}).addTo(map);
