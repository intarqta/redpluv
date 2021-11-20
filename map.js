
var map = L.map('map').setView([-28.95,-60.67], 8); 
// Agregar Google Hibrido como mapa base
var osmLayer =  L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);
// Función para generar un cartel al hacer click en el pluviometro
function popUpInfo(feature, layer) {
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup("<b>"+feature.properties.Name+"</b>");
        // layer.bindPopup(feature.properties.Name);
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
    onEachFeature: popUpInfo
    }).addTo(map);
