let demoMap = L.map('map').setView([40.453191, -3.509236], 6);	
const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(osmUrl, {
    minZoom: 5,
    maxZoom: 16,
}).addTo(demoMap);