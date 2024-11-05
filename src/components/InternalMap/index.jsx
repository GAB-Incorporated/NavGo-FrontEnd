import { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import api from '../../api.js'

const InternalMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchInternalLocations = async () => {
      try {
        const response = await api.get('/locations');
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInternalLocations();
  }, []);

  useEffect(() => {
    let map, sidebar;

    if (!map) {
    
        // Estilos das paredes
        const wallStyle = {
            color: 'black',
            weight: 2,
            opacity: 1,
        };

        // Cria o mapa interno
        map = L.map('internalMap', {
            crs: L.CRS.Simple,
            minZoom: 0,
        });

        map.setView([25.25, 9.5], 3);
        map.addControl(new L.Control.Fullscreen());

        sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'right'
        });
        map.addControl(sidebar);

        const layers = {};

        // Mapeia as locations dinamicamente
        locations.forEach((location) => {

        const layer = L.polygon(location.coordinates, wallStyle).on('click', function () {
          sidebar.show();
        });
        
        if (!layers[location.floor_number]) {
          layers[location.floor_number] = L.layerGroup([layer]);
        } else {
          layers[location.floor_number].addLayer(layer);
        }
        });

        const baseMaps = {
            ...Object.keys(layers).reduce((acc, key) => {
            acc[`Floor ${key}`] = layers[key];
            return acc;
            }, {}),
        };

        L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);
    }

    // Remove o externo para renderizar o interno
    return () => {
        if (map) {
            map.remove();
            map = null;
        }
    };
  }, [locations]);

    return (
        <div style={{height: "100vh", width: "100%"}}>
            <div id="internalMap" style={{height: "100%"}}></div>
            <div id="sidebar"></div>
        </div>
  );
};

export default InternalMap;
