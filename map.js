
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
    iconUrl:'cloud-showers-heavy-solid.svg',
    iconSize:[40,47]
})
// Función para generar un cartel al hacer click en el pluviometro
function popUpInfo (feature, layer) {
    if (feature.properties && feature.properties.Name) {
        layer.bindTooltip("<b>" + feature.properties.Name + "</b>", {
            interactive: true,
            permanent: false,
            fillopacity: 0.01,
            direction: 'top',
            className: 'popup',
        });
        layer.setIcon(redMarker, {opacity:0.01})
    }
    if(feature.properties.Name == "Las Gamas"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPkvrJTd9htwRfpZljuCVM4PAG5sMLomQKWbCzZdrgdqhaH4E24EpfhO4DwPr8HjCf51xSFR39qDqD/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
    }
    if(feature.properties.Name == "Avellaneda"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSdjQUj75mJCZaSN_t8KM3EDt1Yzokr6oVrvjHKxhHWe5igf6GL068ydM_MaM-PYVOwl8CJ-qQoFCCT/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
    }
    if(feature.properties.Name == "Forestagro"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe id = "iframe-top" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSeULxpXgsYaEpnSJk7ezGOqmmWl1idS2PwQQ1eF3RR7KHA0zQohCwoXt3KgdrR0Pfqo8Kw24cdH8GP/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
    }
    if(feature.properties.Name == "Miguel Cancian"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSqDfqfeh0zuthem6_b35heBySXkYQoU3xw5zLqNX8l_Dw9QCiyG3IPymCOcn4KexOsMy-Bo6f8U4Ze/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
    }
    if(feature.properties.Name == "Col. La Criolla"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS_eaFDSPS93T2Bt8qXcawcbTQBG4idQBNXNzWOZWJKVHA9e71_8tnzZ54FHtuxOYhh2QlIsrZ17V8K/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
    }
    if(feature.properties.Name == "Cooperativa de Margarita"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSspPrIK5bd67pM3oG_oM-9VF5A3dm1ngkpxD6k1QuaQo_YyfvrwB1lpFHci8Bw0ESWNLJmLr2e5xaP/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
    }
    if(feature.properties.Name == "Ferreira_Alejandra"){
        layer.bindPopup(
                "<br>"+"<strong> Nombre del Plúviometro: </strong>" + feature.properties.Name +"</br>"+
                "<br><b>Provincia: </b>Santa Fe</br>" +
                "<br><b>Distrito: </b>Vera</br>"+
                '<br><center><iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTeWFYObcPWybkihsSSSm7N-qVzegmCVL6H3OeQq0Zm-YN_L242Qw1nL7ZiwgFfFw0KInoRZgTWEpTR/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe></center></br>'+
                '<br><center><form fillColor= "orange" action="https://docs.google.com/spreadsheets/d/18PL7isuz2yaOY4Bplz_agPaH3prKeNkRbja8FgLCzE0/edit?usp=sharing"><input type="submit" value="Mas datos" /></form></center>'       
                , {
                    stroke: false,
                    fillColor: '00000000',
                    fillOpacity: 0,
                    maxWidth: 800
                });
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

