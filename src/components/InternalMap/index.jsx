import { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import api from '../../api.js';
import styles from './InternalMap.module.css'

const InternalMap = () => {
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState([]);

  const [nodes, setNodes] = useState([]);
  const [selectedStartNode, setSelectedStartNode] = useState(null);
  const [selectedEndNode, setSelectedEndNode] = useState(null);

  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const toggleOverlay = () => {
    setOverlayVisible(prevState => !prevState);
  };

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

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await api.get("/routing/nodes");
        setNodes(response.data);
      } catch (err) {
        console.error("Erro ao buscar os nodes:", err);
      }
    };
    
    fetchNodes();
  }, []);

  const handleRouteCalculation = async () => {
    if (!selectedStartNode || !selectedEndNode) return;

    try {
      const startNode = nodes.find((node) => node.node_id === parseInt(selectedStartNode));
      const endNode = nodes.find((node) => node.node_id === parseInt(selectedEndNode));

      const response = await api.post("/routing/route", {
        start: { x: startNode.x, y: startNode.y, floor: startNode.floor_number, building_id: startNode.building_id },
        end: { x: endNode.x, y: endNode.y, floor: endNode.floor_number, building_id: endNode.building_id },
      });

      setPath(response.data);
    } catch (err) {
      console.error("Erro ao calcular a rota:", err);
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
              acc[`Andar ${key}`] = L.layerGroup([locationLayer, pathLayer]);
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
        const firstLayer = baseMaps[`Andar 0`];
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
    <div>
      <div className={styles.container}>
        <div id="internalMap" className={styles.internalMap}></div>
        <div id="sidebar" className={styles.sidebar}></div>
        {isOverlayVisible && (
        <button className={styles.toggleButton} onClick={toggleOverlay}>
          Minimizar
        </button>
        )}
        {isOverlayVisible && (
          <div className={styles.overlay}>

            <div className={styles.selectWrapper}>
              <select
                id="startNode"
                onChange={(e) => setSelectedStartNode(e.target.value)}
                className={styles.selectInput}
              >
                <option value="">Selecione o Início</option>
                {nodes.map((node) => (
                  <option key={node.node_id} value={node.node_id}>
                    {`Andar ${node.floor_number} - ${node.description}`}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectWrapper}>
              <select
                id="endNode"
                onChange={(e) => setSelectedEndNode(e.target.value)}
                className={styles.selectInput}
              >
                <option value="">Selecione o Destino</option>
                {nodes.map((node) => (
                  <option key={node.node_id} value={node.node_id}>
                    {`Andar ${node.floor_number} - ${node.description}`}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRouteCalculation}
              disabled={!selectedStartNode || !selectedEndNode}
              className={styles.calculateButton}
            >
              Calcular Rota
            </button>
          </div>
        )}

        {/* Botão fixo na parte inferior direita da página quando o overlay estiver minimizado */}
        {!isOverlayVisible && (
          <button className={styles.toggleButtonMinimized} onClick={toggleOverlay}>
            Expandir
          </button>
        )}
      </div>
    </div>
  );
  
};

export default InternalMap;
