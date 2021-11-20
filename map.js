var map = L.map('map').setView([-29.8,-60.5], 8); 
var roads = L.gridLayer
	.googleMutant({
		type: "hybrid", // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
	})
	.addTo(map);

// var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
// }).addTo(map);

function popUpInfo(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup("<b>"+feature.properties.Name+"</b>");
        // layer.bindPopup(feature.properties.Name);
    }
}
L.geoJson(RedPlu, {
    onEachFeature: popUpInfo
    }).addTo(map);
