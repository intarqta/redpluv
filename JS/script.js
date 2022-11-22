/* eslint-disable no-undef */
/**
 * sidebar replacing popup
 */

// config map
let config = {
    minZoom: 8,
    maxZoom: 18,
  };
 
  // magnification with which the map will start
  const zoom = 18;
  // co-ordinates
  
  const lat = -60.45;
  const lng = -28.83;
  
  // calling map
  const map = L.map("map", config).setView([lat, lng], zoom);
  
  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);
  
  // ------------------------------------------------------------
  // async function to get data from json
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  // --------------------------------------------------
  // button to close sidebar
  const buttonClose = document.querySelector(".close-button");
  
  let featureGroups = [];
  let groupBounds;
  let latlngs = [];
  
  // function to add markers to map
  fetchData("./Json/red.json")
    .then((data) => {
      // create markers width "marker-options-id"
      data.map((marker) => {
        featureGroups.push(
          L.marker(marker.properties.coords, {
              icon: L.icon({
              iconUrl:'IMG/cloud-showers-heavy-solid.svg',
              iconSize:[40,47],
              // html: `${marker.properties.id}`,            
            }),
            "marker-options-id": marker.properties.id,
            "marker-options-lugar": marker.properties.Lugar,
          })
        );
        latlngs.push(marker.properties.coords);
        
      });
      
      // add polyline to map
      L.geoJson(latlngs, {
        color: "#ff3939",
        weight: 2,
      }).addTo(map);
      /*añadir los departamentos al mapa*/
      L.geoJson(Departamentos,{
        fillOpacity:0,
        color:'indigo',
        weight: 2,
      }).addTo(map);  
      return data;
    })
    .then((data) => {
      
      // create feature group
      // add markers to map
      featureGroups.map((marker) => {
          marker.bindTooltip("<b>" + marker.bindTooltip().options["marker-options-lugar"] + "</b>", {
          interactive: true,
          permanent: false,
          fillopacity: 0.01,
          direction: 'top',
          className: 'popup',
         }).addTo(map);
      });
  
      // create feature group with markers
      groupBounds = new L.featureGroup(featureGroups);
  
      // fitBounds of feature group to map
      map.fitBounds(groupBounds.getBounds(), {
        padding: [50, 50],
      });
  
      // add event listener to markers to open sidebar
      groupBounds.on("click", function (e) {
        if (e.layer instanceof L.Marker) {
          showSidebarWidthText(e.layer.options["marker-options-id"]);
        }
      });
  
      // add comment to sodebar depending on marker id
      function showSidebarWidthText(id) {
        data.filter((marker) => {
          if (marker.properties.id === id) {
            document.body.classList.add("active-sidebar");
            addContentToSidebar(marker);
          }
        });
      }
    });
  
  //--------------------------------------------------
  // close when click esc
  document.addEventListener("keydown", function (event) {
    // close sidebar when press esc
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
  
  // close sidebar when click on close button
  buttonClose.addEventListener("click", () => {
    
    // close sidebar when click on close button
    closeSidebar();
    map.setView([-29.25 ,-60.45], 8);
  });
  
  
  // --------------------------------------------------
  // cerrar la ventana emergente izquierda
  
  function closeSidebar() {
    // remove class active-sidebar
    document.body.classList.remove("active-sidebar");
  
    // bounds map to default
    boundsMap();
    
  }
  
  // --------------------------------------------------
  // add content to sidebar
  const ContdataTable = document.getElementById("divContdataTable"); 
  var myChart;
  function addContentToSidebar(marker) {
    const { id, Lugar, coords } = marker;
    const smallInfo = Lugar !== undefined ? `<small>${Lugar}</small>` : "";
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1awrrt2lEPwK-Y16boJWzRtW1INCDPqBpax6DsUAR26A/values/Hoja 1!A:D?key=AIzaSyBqSKs7DT9oDteBtU5-tgs5t3nxfciLFz0')
    .then(res => res.json())
    .then(datos => {
        tabla(datos.values)
    })
    
    function tabla(datos) {
      const datos2 = datos.filter(cien => {
        return cien[1] === marker.properties.Nombre;
      }) 

      var max = datos2.reduce(function (valor1, valor2) { return new Date(valor1) > new Date(valor2) ? valor1 : valor2; });
      /* función que permite obtener los últimos valores del json*/
      Array.prototype.last = function(n){
        return this.slice(-n)
      };
      var max3 = datos2.last(5);
      
      max3.forEach(data =>{       

    // create sidebar content
    const sidebarTemplate = `
      <article class="sidebar-content">
        <h3 class="titulo">${marker.properties.Lugar}</h3>
        <div class="marker-id">Lugar: ${marker.properties.Lugar}</div>
        <div class="marker-id2">Distrito: ${marker.properties.nam}</div>
        <div class="marker-id3">Departamento: ${marker.properties.Dep_nam}</div>
        <div class="marker-id4">Plúviometro: ${marker.properties.Tip_Plu}</div>
        <h2 class="marker-id5">Último registro</h2>
        <h3 class="marker-id6">Fecha: ${ max[2]}</h3>
        <h3 class="marker-id7">Lluvia: ${ max[3]}</h3>
        <button type="button" id="botonPopupMasDatos" class="btn btn-info btn-sm btn-block dataModal botonPopupMasDatos" data-toggle="modal" data-target="#dataModal" >Mas Datos</button>     
        </article>
    `;
    
      
    // create sidebar content
    const addconttemplate = `
      <article class="sidebar-content">
        <div class="marker-id">Lugar: ${marker.properties.Lugar}</div>
        <div class="marker-id2">Distrito: ${marker.properties.nam}</div>
        <div class="marker-id3">Departamento: ${marker.properties.Dep_nam}</div>
        <div class="marker-id4">Plúviometro: ${marker.properties.Tip_Plu}</div>
          <table class="tablaDatos">
        
          <tbody class= "tableEncab">
            </tbody class="TablaCuerpo">
            <tbody class= "tableEncab">
            <tr class ="tableTr">
            <th class ="tableTh"> Fecha </th>
            ${max3.map((itm)=>{
              return `<td>${itm[2]}</td>`
            },'').join('')}</tr>
            <tr class ="tableTr">
            <th class ="tableTh"> Precipitación </th>
            ${max3.map((itm)=>{
              return `<td>${itm[3]}</td>`
            },'').join('')}</tr>
            
            </tbody>
        </table> 
      </article>
    `;

    const sidebar = document.querySelector(".sidebar");
    const sidebarContent = document.querySelector(".sidebar-content");

    // Agregar información para interpretar las capas
        overlay = document.getElementById('overlay'),
        popup = document.getElementById('popup-popup'),
        btnCerrarPopup = document.getElementById('btn-cerrar-popup');

    $(document).ready(function(){
      $(document).on('click',  '.botonPopupMasDatos',function(){
        overlay.classList.add('active');
        popup.classList.add('active');
        document.getElementById('botonpluv1').click();
      })
    })

     btnCerrarPopup.addEventListener('click', function(e){
       e.preventDefault();
       overlay.classList.remove('active');
       popup.classList.remove('active');
      canvas.classList.remove('active');
      /*Función que permite destruir el evento gráfico al cambiar de pestaña o cerrar el pupup */
      if(myChart){
        myChart.destroy();
      }
     });
    /*Carga de datos dentro del popup Pluviometro de mas datos*/
    const botonpluv = document.getElementById('botonpluv1');
    botonpluv.addEventListener('click', function(){
      const addContpopup = document.getElementById("divContdata");
      addContpopup.classList.remove('active');
      canvas.classList.remove('active');
      // always remove content before adding new one
      sidebarContent?.remove();
      document.getElementById("divContdata").innerHTML="";
      // add content to sidebar
      addContpopup.insertAdjacentHTML("beforeend", addconttemplate);
      // set bounds depending on marker coords
      boundsMap(coords);
    })
    
    // always remove content before adding new one
    sidebarContent?.remove();
    document.getElementById("contenido").innerHTML="";
    document.getElementById("divContdata").innerHTML="";
    // add content to sidebar
    sidebar.insertAdjacentHTML("beforeend", sidebarTemplate);
      
    // set bounds depending on marker coords
    boundsMap(coords);
  })
  /*Carga de gráficas y link de descarga dentro del popup Datos*/     
    const canvas = document.getElementById('chart-Bar');
    const ctx = canvas.getContext('2d');
    

    const configChart = {
      type: 'bar',
      data: {
         labels: datos2.map(data =>{return data[2]}),
         datasets: [{
            label: 'Lluvias '+ max[1],
            data: datos2.map(data =>{return data[3]}),
            backgroundColor: 'rgba(0, 119, 204, 0.5)'
         }]
      } 
    };
  const botondatos = document.getElementById('botonpluv')
   botondatos.addEventListener('click', function(){

    document.getElementById("divContdata").innerHTML="";

    const addContpopup = document.getElementById("divContdata");
    addContpopup.classList.add('active');
    document.getElementById("divContdata").innerHTML="";
    /*Función que permite destruir el evento gráfico al cambiar de pestaña o cerrar el pupup */
    if(myChart){
      myChart.destroy();
    }
      // añadir el gráfico y asignarle la clase active 
      myChart =  new Chart(ctx, configChart);
      canvas.classList.add('active');
   })
   /*Descargar los datos de cada plúviometro al hacer click en el botón*/
   const BotonDescarga = document.getElementById("botonDescarga");
   BotonDescarga.addEventListener('click', function (){
    var headDatos = Array(["Agencia","Establecimiento","Fecha","Precipitación"]).concat(datos2);
    console.log(headDatos)
    var csv = headDatos.map(function(d){
    return d.join();
    }).join('\n');
    var link = document.createElement("a");    
    link.id="lnkDwnldLnk";
    document.body.appendChild(link);
    blob = new Blob([csv], { type: "text/csv;charset=System;" }); 
    var csvUrl = window.webkitURL.createObjectURL(blob);
    var filename = 'DatosPluv_'+datos2[1][1]+'.csv';
    jQuery("#lnkDwnldLnk")
    .attr({
        'download': filename,
        'href': csvUrl
    });
    jQuery('#lnkDwnldLnk')[0].click();
    document.body.removeChild(link);
   })

  }
}

   
  // --------------------------------------------------
  // bounds map when sidebar is open
  function boundsMap(coords) {
    const sidebar = document.querySelector(".sidebar").offsetWidth;
  
    const marker = L.marker(coords);
    const group = L.featureGroup([marker]);
  
    // bounds depending on whether we have a marker or not
    const bounds = coords ? group.getBounds() : groupBounds.getBounds();
  
    // set bounds of map depending on sidebar
    // width and feature group bounds
    map.fitBounds(bounds, {
      paddingTopLeft: [coords ? sidebar :   400, 0],
    });
    
  }
