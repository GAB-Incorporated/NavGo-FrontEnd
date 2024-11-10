import { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import api from '../../api.js';

const InternalMap = () => {
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await api.get('/locations');
        setLocations(locationsResponse.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const calculateRoute = async () => {
    const start = { x: 72.00, y: 8.00, floor: 0, building_id: 1 };
    const end = { x: 20.00, y: 20.00, floor: 0, building_id: 1 };

    try {
      const response = await api.post('/routing/route', {
        start,
        end,
      });
      setPath(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let map, sidebar;

    if (!map) {
        const wallStyle = {
            color: 'black',
            weight: 2,
            opacity: 1,
        };

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

        // Desenha os nodes como bolinhas
        if (path.length > 0) {
            path.forEach(node => {
                L.circle([node.x, node.y], { radius: 0.5, color: 'blue' }).addTo(map);
            });
        }
    }

    return () => {
        if (map) {
            map.remove();
            map = null;
        }
    };
  }, [locations, path]);

  return (
      <div style={{height: "100vh", width: "100%"}}>
          <div id="internalMap" style={{height: "100%"}}></div>
          <div id="sidebar"></div>
          <button onClick={calculateRoute}>Calculate Route</button> {/* Botão horrível no fim da tela para teste */}
      </div>
  );
};

export default InternalMap;
