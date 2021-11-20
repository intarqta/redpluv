
var map = L.map('map').setView([-29.8,-60.5], 8); 
// Agregar Google Hibrido como mapa base
var osmLayer =  L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 8,
    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);
// Función para generar un cartel al hacer click en el pluviometro
function popUpInfo(feature, layer) {
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup("<b>"+feature.properties.Name+"</b>");
        // layer.bindPopup(feature.properties.Name);
    }
}
// Agregar el GeoJson al mapa
L.geoJson(RedPlu, {
    onEachFeature: popUpInfo
    }).addTo(map);
