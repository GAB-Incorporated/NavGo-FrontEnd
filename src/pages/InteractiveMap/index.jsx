import { useState } from "react";
import { MapContainer, TileLayer, Polygon, Polyline, Popup } from "react-leaflet";
import styles from './interactiveMap.module.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet-sidebar-v2/js/leaflet-sidebar.js';
import 'leaflet-sidebar-v2/css/leaflet-sidebar.css';
import Sidebar from '../../components/Sidebar';
import InternalMap from "../../components/InternalMap/index.jsx";

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
    setShowInternalMap(true);
  };

  return (
    <div className={styles.mapContainer}>
      {!showInternalMap && <Sidebar />}
      
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

export default InteractiveMap;
