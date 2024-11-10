import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Polyline, Popup} from "react-leaflet";
import styles from './interactiveMap.module.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet-sidebar-v2/js/leaflet-sidebar.js';
import 'leaflet-sidebar-v2/css/leaflet-sidebar.css';


const InteractiveMap = () => {

  const [showInternalMap, setShowInternalMap] = useState(false);

  const institutionCoordinates = [
    [-23.641745, -46.836244],
    [-23.641423, -46.836757],
    [-23.640949, -46.836323],
    [-23.640958, -46.836029],
    [-23.641084, -46.835416]
  ];

  const buildingCoordinates = [
    [-23.641008, -46.836329],
    [-23.641190, -46.836365],
    [-23.641292, -46.835695],
    [-23.641119, -46.835665]
  ];

  const hallwayCoordinates = [
    [-23.6415495, -46.835993],
    [-23.641523, -46.836090],
    [-23.641453, -46.836110],
    [-23.641361, -46.836120],
    [-23.641303, -46.836173],
    [-23.641239, -46.836469]
  ];

  const handleBuildingClick = () => {
    setShowInternalMap(true)
  };

  return (
    <div className={styles.mapContainer}>
      {!showInternalMap ? (
        <MapContainer center={[-23.641154, -46.836002]}
          zoom={18}
          maxZoom={22}
          style={{ height: "100vh", width: "100%" }}
          className={styles.leafletContainer}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Polygon positions={institutionCoordinates} color="yellow">
            <Popup>Área da Instituição</Popup>
          </Polygon>

          <Polygon positions={buildingCoordinates} color="orange" eventHandlers={{ click: handleBuildingClick }}>
            <Popup>Prédio da ETEC</Popup>
          </Polygon>

          <Polyline positions={hallwayCoordinates} color="green">
            <Popup>Entrada principal</Popup>
          </Polyline>

        </MapContainer>
      ) : (
        <InternalMap />
      )}
    </div>
  );
};

const InternalMap = () => {
  console.log("Iniciando o mapa interno");
  useEffect(() => {
    let map;
    //verifica se o mapa já foi criado(ele não pode ser renderizado duas vezes, e como já temos o mapa externo, primeiro temos que destruir o mapa externo para criarmos o interno)
    if (!map) {

      const wallStyle = {
        color: 'black',
        weight: 2,
        opacity: 1,
      };

      const createPopupContent = (content) => {
        const container = L.DomUtil.create('div', 'popup-content');
        
        const title = L.DomUtil.create('h4', 'popup-title', container);
        title.textContent = content.title;
        
        const description = L.DomUtil.create('p', 'popup-description', container);
        description.textContent = content.description;
      
        return container;
      };

      const firstFloor = L.rectangle([
        [0, 0],
        [72, 20]
      ], wallStyle);

      const staircaseFirstFloor = L.polygon([ // Escada no segundo andar
        [55, 2],
        [59, 2],
        [59, 8],
        [55, 8]
      ], {
        color: 'blue',
        fillColor: 'lightblue',
        fillOpacity: 0.5,
      }).bindPopup(createPopupContent({ title: "Escada 1º Andar", description: "Escada para o térreo e para o segundo andar." }));

      const stairLineFirstFloor = L.polygon([
        [57, 8],
        [57, 2]
      ], {
        color: 'blue',
        fillColor: 'lightblue',
        fillOpacity: 0.5,
      }).bindPopup(createPopupContent({ title: "Escada 1º Andar", description: "Escada para o térreo e para o segundo andar." }))

      const library = L.polygon([
        [72, 8],
        [72, 20],
        [64, 20],
        [64, 8]
      ], wallStyle).bindPopup(createPopupContent({ title: "Biblioteca", description: "Informações sobre a biblioteca e como chegar lá." }));

      const cpd = L.polygon([
        [72, 0],
        [72, 8],
        [59, 8],
        [59, 0]
      ], wallStyle).bindPopup(createPopupContent({ title: "CPD", description: "Informações sobre o CPD." }));

      const secretary = L.polygon([
        [64, 13],
        [64, 20],
        [53, 20],
        [53, 13]
      ], wallStyle).bindPopup(createPopupContent({ title: "Secretaria", description: "Informações sobre a secretaria." }));

      const diretory = L.polygon([
        [53, 13],
        [53, 20],
        [44, 20],
        [44, 13]
      ], wallStyle).bindPopup(createPopupContent({ title: "Diretoria", description: "Informações sobre a diretoria." }));

      const kitchen = L.polygon([
        [44, 13],
        [44, 20],
        [34, 20],
        [34, 13]
      ], wallStyle).bindPopup(createPopupContent({ title: "Cozinha", description: "Informações sobre a cozinha." }));

      const mensBathroom = L.polygon([
        [34, 13],
        [34, 20],
        [27, 20],
        [27, 13]
      ], wallStyle).bindPopup(createPopupContent({ title: "Banheiro Masculino", description: "Informações sobre o banheiro masculino." }));

      const womensBathroom = L.polygon([
        [27, 13],
        [27, 20],
        [20, 20],
        [20, 13]
      ], wallStyle).bindPopup(createPopupContent({ title: "Banheiro Feminino", description: "Informações sobre o banheiro feminino." }));

      const labMaker = L.polygon([
        [20, 13],
        [10, 13],
        [10, 20],
        [20, 20]
      ], wallStyle).bindPopup(createPopupContent({ title: "Laboratório Maker", description: "Informações sobre o laboratório maker." }));

      const auditorium = L.polygon([
        [0, 13],
        [10, 13],
        [10, 20],
        [0, 20]
      ], wallStyle).bindPopup(createPopupContent({ title: "Auditório", description: "Informações sobre o auditório." }));

      const cafeteria = L.polygon([
        [0, 0],
        [12, 0],
        [12, 8],
        [0, 8]
      ], wallStyle).bindPopup(createPopupContent({ title: "Cafeteria", description: "Informações sobre a cafeteria." }));

      const A1 = L.layerGroup([ //Fim da config do térreo
        firstFloor, 
        staircaseFirstFloor, stairLineFirstFloor,
        library, cpd, secretary, diretory, kitchen, mensBathroom, womensBathroom, labMaker, auditorium, cafeteria
      ]);

      const secondFloor = L.rectangle([
        [0, 0],
        [72, 20]
      ], wallStyle);

      const staircaseSecondFloor = L.polygon([ // Escada no segundo andar
        [55, 2],
        [59, 2],
        [59, 8],
        [55, 8]
      ], {
        color: 'blue',
        fillColor: 'lightblue',
        fillOpacity: 0.5,
      }).bindPopup(createPopupContent({ title: "Escada 1º Andar", description: "Escada para o térreo e para o segundo andar." }));

      const stairLine = L.polygon([
        [57, 8],
        [57, 2]
      ], {
        color: 'blue',
        fillColor: 'lightblue',
        fillOpacity: 0.5,
      }).bindPopup(createPopupContent({ title: "Escada 1º Andar", description: "Escada para o térreo e para o segundo andar." }))
      // const A2hallwayleft = L.polygon([
      //   [0, 7],
      //   [72, 7]
      // ], wallStyle)

      // const A2hallwayright = L.polygon([
      //   [0, 13],
      //   [72, 13]
      // ], wallStyle)

      const lab06 = L.polygon([
        [2, 0],
        [10, 0],
        [10, 6],
        [2, 6]
      ], wallStyle).bindPopup(createPopupContent({ title: "Laboratório 6", description: "zaas" }));

      const lab01 = L.polygon([
        [67, 8],
        [65, 8],
        [65, 8],
        [65, 10],
        [72, 10],
        [72, 0],
        [67, 0],
      ], wallStyle).bindPopup(createPopupContent({ title: "Laboratório 1", description: "O melhor lab" }));
      
      const lab04 = L.polygon([
        [66, 12],
        [65, 12],
        [65, 10],
        [72, 10],
        [72, 20],
        [67, 20],
        [67, 12]
      ], wallStyle).bindPopup(createPopupContent({title: "Lab 04", description: "Laboratório 4"}));
      
      const lab05 = L.polygon([
        [67, 12],
        [67, 20],
        [59, 20],
        [59, 12]
      ], wallStyle).bindPopup(createPopupContent({ title: "Lab 05", description: "Laboratório 5"}));
      
      const lab03 = L.polygon([
        [59, 0],
        [67, 0],
        [67, 8],
        [59, 8]
      ], wallStyle).bindPopup(createPopupContent({ title: "Sala 2", description: "Informações sobre a Sala 2." }));
      
      function createQuarterCircle(center, radius, startAngle, endAngle, segments = 30) {
        const latlngs = [center];
        const angleStep = (endAngle - startAngle) / segments;
      
        for (let i = 0; i <= segments; i++) {
          const angleRad = (startAngle + i * angleStep) * (Math.PI / 180);
          const lat = center[0] + (radius / 111) * Math.cos(angleRad); // Aproximação para latitude
          const lng = center[1] + (radius / (111 * Math.cos(center[0] * (Math.PI / 180)))) * Math.sin(angleRad); // Aproximação para longitude
          latlngs.push([lat, lng]);
        }
      
        latlngs.push(center); // Fechar o polígono
        return L.polygon(latlngs, wallStyle, {
        });
      }
      
      const lab07Corner = createQuarterCircle([52, 16], 222, 360, 270); // 0 a 90 graus para um quarto de círculo
      
      const wallCorner = L.polygon([
        [54, 16],
        [54, 20],
        [52, 20],
        [52, 16]
      ], wallStyle)

      const lab07 = L.polygon([
        [59, 12],
        [59, 20],
        [52, 20],
        [52, 12]
      ], wallStyle).bindPopup(createPopupContent({ title: "Lab 07", description: "Laboratório 07"}));


      // const lab07 = L.polygon([
      //   [67, 12],
      //   [67, 20],
      //   [52, 20],
      //   [52, 12]
      // ], wallStyle).bindPopup(createPopupContent({ title: "Lab 07", description: "Laboratório 07"}));


      const A2 = L.layerGroup([ // Primeiro andar
        secondFloor, 
        staircaseSecondFloor, stairLine,
        lab01, lab04, lab05, lab06, lab03,
        lab07, lab07Corner, wallCorner
      ]);

      //define os layers base do mapa
      const baseMaps = {
        "Térreo": A1,
        "1º Andar": A2
      };
      
      //cria o mapa interno
      map = L.map('internalMap', {
        crs: L.CRS.Simple, // Define o sistema de coordenadas
        minZoom: 0, // Define o nível de zoom mínimo
        layers: [A2], // Define o layer inicial para o segundo andar
      });
      
      // Define o centro do mapa para o segundo andar
      map.setView([55, 25], 5); // Ajuste as coordenadas e o zoom conforme necessário
      
      // Adiciona o botão de tela cheia
      map.addControl(new L.Control.Fullscreen());
      
      L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);    
    }
    
    //função para limpar o mapa quando o componente é desmontado
    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);
  
  //retorna o mapa interno
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div id="internalMap" style={{ height: "100%" }}></div>
    </div>
  );
}

export default InteractiveMap;