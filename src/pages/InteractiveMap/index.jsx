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
    let map, sidebar;
    //verifica se o mapa já foi criado(ele não pode ser renderizado duas vezes, e como já temos o mapa externo, primeiro temos que destruir o mapa externo para criarmos o interno)
    if (!map) {

      const wallStyle = {
        color: 'black',
        weight: 2,
        opacity: 1,
      };
  
      const A1footprint = L.rectangle([
        [0, 0],
        [72, 20]
      ], wallStyle);

      
      const A1sala1 = L.polyline([
        [2, 0],
        [10, 0],
        [10, 6],
        [2, 6],
        [2, 0]
      ], wallStyle).on('click', function() {
        sidebar.show();
      })
      
      const A1sala2 = L.polyline([
        [60, 0],
        [68, 0],
        [68, 6],
        [60, 6],
        [60, 0],
      ], wallStyle).on('click', function () {
        sidebar.show();
      });
  
      const A1 = L.layerGroup([A1footprint, A1sala1, A1sala2]);
  
      const A2footprint = L.rectangle([
        [0, 0],    //ponto sudoeste
        [72, 20]   //ponto nordeste
      ], wallStyle);

      const A2hallwayleft = L.polyline([
        [0, 7],   // Ponto inicial à esquerda
        [72, 7]   // Ponto final à direita
      ], wallStyle).on('click', function () {
        sidebar.show();
      });

      const A2hallwayright = L.polyline([
        [0, 13],
        [72, 13]
      ], wallStyle).on('click', function() {
        sidebar.show();
      })
  
      const A2sala1 = L.polyline([
        [2, 0],
        [10, 0],
        [10, 6],
        [2, 6],
        [2, 0]
      ], wallStyle).on('click', function () {
        sidebar.show();
      });
  
      const A2sala2 = L.polyline([
        [60, 0],
        [68, 0],
        [68, 6],
        [60, 6],
        [60, 0]
      ], wallStyle).on('click', function () {
        sidebar.show();
      });

      //cria os layers para renderizar os elementos que foram criados
      const A2 = L.layerGroup([A2footprint, A2hallwayleft, A2hallwayright, A2sala1, A2sala2]);
      
      //define os layers base do mapa
      const baseMaps = {
        "Térreo": A1,
        "1º Andar": A2
      };
      
      //cria o mapa interno
      map = L.map('internalMap', {
        crs: L.CRS.Simple, //define o sistema de coordenadas
        minZoom: 0, //define o nível de zoom mínimo
        layers: [A1], //define o layer inicial
      });
      
      //define o centro do mapa
      map.setView([25.25, 9.5], 3);
      //adiciona o botão de tela cheia
      map.addControl(new L.Control.Fullscreen());
  
      //evento de mudança de layer
      map.on('baselayerchange', function () {
        //deveria ocultar a sidebar, mas como não está funcionando, não acontece ainda.
        sidebar.hide();
      });
  
      sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'right'
      });
      map.addControl(sidebar);
  
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
    <div style={{height: "100vh", width: "100%"}}>
      <div id="internalMap" style={{height: "100%"}}></div>
      <div id="sidebar"></div>
    </div>
  )
}

export default InteractiveMap;