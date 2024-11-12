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
    const start = { x: 3, y: 9, floor: 0, building_id: 1 };
    const end = { x: 61, y: 9, floor: 1, building_id: 1 };
    
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

  const createPopupContent = (content) => {
    const container = L.DomUtil.create('div', 'popup-content');
    
    const title = L.DomUtil.create('h4', 'popup-title', container);
    title.textContent = content.title;
    
    const description = L.DomUtil.create('p', 'popup-description', container);
    description.textContent = content.description;
  
    return container;
  };

  const drawCartesianPlane = (map, xMax, yMax) => {
    for (let i = 0; i <= xMax; i++) {
      L.polyline([[i, 0], [i, yMax]], { color: 'gray', weight: 1, opacity: 0.5 }).addTo(map);
      L.marker([i, -0.5], { icon: new L.DivIcon({ className: 'coordinate-label', html: i }) }).addTo(map);
    }
    for (let j = 0; j <= yMax; j++) {
      L.polyline([[0, j], [xMax, j]], { color: 'gray', weight: 1, opacity: 0.5 }).addTo(map);
      L.marker([-0.5, j], { icon: new L.DivIcon({ className: 'coordinate-label', html: j }) }).addTo(map);
    }
  };

  const drawPathLines = (path, pathLayers) => {
    const floorPaths = {};

    // Agrupa os nodes por andar
    path.forEach((node) => {
      if (!floorPaths[node.floor]) {
        floorPaths[node.floor] = [];
      }
      floorPaths[node.floor].push([node.x, node.y]);
    });

    // Desenha uma linha para cada andar com os pontos agrupados
    Object.keys(floorPaths).forEach((floor) => {
      const points = floorPaths[floor];
      const line = L.polyline(points, { color: 'blue', weight: 2 });

      if (!pathLayers[floor]) {
        pathLayers[floor] = L.layerGroup([line]);
      } else {
        pathLayers[floor].addLayer(line);
      }
    });
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

        sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'right'
        });
        map.addControl(sidebar);

        const locationLayers = {};
        const pathLayers = {};

        locations.forEach((location) => {
            const layer = L.polygon(location.coordinates, wallStyle)
                .bindPopup(createPopupContent({ title: location.location_name, description: location.description }));
          
            if (!locationLayers[location.floor_number]) {
                locationLayers[location.floor_number] = L.layerGroup([layer]);
            } else {
                locationLayers[location.floor_number].addLayer(layer);
            }
        });

        // Nodes por andar
        path.forEach((node) => {
            const circle = L.circle([node.x, node.y], { radius: 0.5, color: 'blue' });

            if (!pathLayers[node.floor]) {
                pathLayers[node.floor] = L.layerGroup([circle]);
            } else {
                pathLayers[node.floor].addLayer(circle);
            }
        });   

        drawPathLines(path, pathLayers);
        drawCartesianPlane(map, 72, 20);
             
        // Combina as camadas
        const baseMaps = Object.keys(locationLayers).reduce((acc, key) => {
            const locationLayer = locationLayers[key];
            const pathLayer = pathLayers[key];

            if (locationLayer && pathLayer) {
              acc[`Andar ${key == 0 ? 'Térreo' : key}`] = L.layerGroup([locationLayer, pathLayer]);
            } else if (locationLayer) {
                acc[`Andar ${key}`] = locationLayer;
            } else if (pathLayer) {
                acc[`Andar ${key}`] = pathLayer;
            }
            return acc;
        }, {});

        // Constante 'não' é usada mas é responsável por criar o radiogroup de camada
        const layerControl = L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);
        
        // Marca o primeiro andar omo a camada inicial selecionada
        const firstLayer = baseMaps[`Andar Térreo`];
        if (firstLayer) {
            firstLayer.addTo(map);
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
