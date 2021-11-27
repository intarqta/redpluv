
var map = L.map('map').setView([-29.25,-60.43], 8); 

// Agregar Google Hibrido como mapa base
var osmLayer =  L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

// Crear una red de iconos con logos de lluvias
var redMarker = L.icon({
    color :'red',
    iconUrl:'logo_red.png',
    iconSize:[40,47]
})
// Función para generar un cartel al hacer click en el pluviometro
function popUpInfo (feature, layer) {
    if (feature.properties && feature.properties.Name) {
        layer.bindTooltip()
        // layer.bindTooltip(feature.properties.Name, {
        //     interactive: true,
        //     permanent: false,
        //     fillopacity: 0.01,
        //     direction: 'top',
        //     className: 'popup',
        // }),
        layer.bindPopup("<b>"+feature.properties.Name+"</b>");
        layer.setIcon(redMarker, {opacity:0.01})
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
    fillOpacity:0.1,
    onEachFeature: popUpInfo
}).addTo(map);
