import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const InteractiveMap = ({ theme }) => {
  const [geographyData, setGeographyData] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [position, setPosition] = useState({ coordinates: [12, 5.5], zoom: 6 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Default colors in case theme is not provided
  const colors = theme || {
    primary: "#0070f3",
    secondary: "#7c3aed",
    danger: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    text: "#ffffff",
    textSecondary: "#a1a1aa",
    bgCard: "rgba(255, 255, 255, 0.05)",
    bgSecondary: "#111111",
    bgTertiary: "#1a1a1a",
    border: "rgba(255, 255, 255, 0.1)"
  };

  // Load the GeoJSON data
  useEffect(() => {
    const mockIncidents = [
      { id: 1, name: "Yaoundé", coordinates: [11.5021, 3.8480], value: 85, type: "misinformation" },
      { id: 2, name: "Douala", coordinates: [9.7085, 4.0511], value: 72, type: "hate_speech" },
      { id: 3, name: "Bamenda", coordinates: [10.1469, 5.9631], value: 45, type: "misinformation" },
      { id: 4, name: "Garoua", coordinates: [13.3980, 9.3017], value: 38, type: "fake_news" },
      { id: 5, name: "Maroua", coordinates: [14.3159, 10.5969], value: 29, type: "hate_speech" },
      { id: 6, name: "Bafoussam", coordinates: [10.4135, 5.4764], value: 52, type: "misinformation" },
      { id: 7, name: "Ngaoundéré", coordinates: [13.5837, 7.3220], value: 33, type: "fake_news" },
      { id: 8, name: "Bertoua", coordinates: [13.6846, 4.5755], value: 27, type: "misinformation" },
      { id: 9, name: "Limbe", coordinates: [9.2102, 4.0215], value: 41, type: "hate_speech" },
      { id: 10, name: "Ebolowa", coordinates: [11.1500, 2.9000], value: 19, type: "fake_news" }
    ];
    setIncidents(mockIncidents);

    // Load the GeoJSON data
    fetch('/cm.json')
      .then(response => response.json())
      .then(data => {
        // Convert single Feature to FeatureCollection if needed
        const geoData = data.type === 'Feature' ? {
          type: 'FeatureCollection',
          features: [data]
        } : data;
        setGeographyData(geoData);
        console.log("Geography Data:", geoData);
      })
      .catch(error => {
        console.error("Error loading map data:", error);
      });
  }, []);

  // Scale for marker size
  const markerScale = scaleLinear()
    .domain([0, 100])
    .range([5, 20]);

  // Get color based on incident type
  const getMarkerColor = (type) => {
    switch (type) {
      case "misinformation":
        return colors.primary;
      case "hate_speech":
        return colors.danger;
      case "fake_news":
        return colors.warning;
      default:
        return colors.secondary;
    }
  };

  // Handle map zoom
  const handleZoomIn = () => {
    if (position.zoom >= 16) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  // Handle tooltip display
  const handleMarkerMouseEnter = (incident, event) => {
    setTooltipContent(`
      <strong>${incident.name}</strong><br/>
      Type: ${incident.type.replace('_', ' ')}<br/>
      Severity: ${incident.value}
    `);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
    setShowTooltip(true);
  };

  const handleMarkerMouseLeave = () => {
    setShowTooltip(false);
  };

  if (!geographyData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: colors.border }}>
          <button
            onClick={handleZoomIn}
            className="px-4 py-2 transition-all duration-200 hover:scale-105"
            style={{ 
              backgroundColor: colors.bgTertiary, 
              color: colors.text,
              borderRight: `1px solid ${colors.border}`
            }}
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="px-4 py-2 transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
          >
            -
          </button>
        </div>
      </div>

      <div 
        className="border rounded-xl overflow-hidden shadow-2xl"
        style={{ 
          borderColor: colors.border,
          backgroundColor: colors.bgCard,
          boxShadow: `0 0 40px ${colors.primary}30, 0 20px 40px rgba(0, 0, 0, 0.3)`
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1500,
            center: [12.5, 5.8]
          }}
          width={600}
          height={600}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geographyData}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colors.bgTertiary}
                    stroke={colors.primary}
                    strokeWidth={0.5}
                    style={{
                      default: {
                        fill: colors.bgTertiary,
                        stroke: colors.primary,
                        strokeWidth: 1,
                        outline: "none"
                      },
                      hover: {
                        fill: colors.primary + "30",
                        stroke: colors.primary,
                        strokeWidth: 1.5,
                        outline: "none"
                      },
                      pressed: {
                        fill: colors.primary + "50",
                        stroke: colors.primary,
                        strokeWidth: 2,
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
            
            {incidents.map(incident => (
              <Marker 
                key={incident.id} 
                coordinates={incident.coordinates}
                onMouseEnter={(e) => handleMarkerMouseEnter(incident, e)}
                onMouseLeave={handleMarkerMouseLeave}
              >
                <circle
                  r={markerScale(incident.value)}
                  fill={getMarkerColor(incident.type)}
                  fillOpacity={0.6}
                  stroke={getMarkerColor(incident.type)}
                  strokeWidth={2}
                  className="animate-pulse"
                  style={{ animationDuration: "2s" }}
                />
                <circle
                  r={markerScale(incident.value) * 1.5}
                  fill="transparent"
                  stroke={getMarkerColor(incident.type)}
                  strokeWidth={1}
                  strokeOpacity={0.3}
                  className="animate-ping"
                  style={{ animationDuration: "3s" }}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {showTooltip && (
        <div
          className="absolute z-10 p-2 rounded-md shadow-lg"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 40,
            backgroundColor: colors.bgCard,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none"
          }}
          dangerouslySetInnerHTML={{ __html: tooltipContent }}
        />
      )}

      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
        <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>Threat Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgCard }}>
            <span className="inline-block w-4 h-4 rounded-full mr-3" style={{ backgroundColor: colors.primary }}></span>
            <div>
              <span className="font-medium" style={{ color: colors.text }}>Misinformation</span>
              <p className="text-sm" style={{ color: colors.textSecondary }}>False information spread</p>
            </div>
          </div>
          <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgCard }}>
            <span className="inline-block w-4 h-4 rounded-full mr-3" style={{ backgroundColor: colors.danger }}></span>
            <div>
              <span className="font-medium" style={{ color: colors.text }}>Hate Speech</span>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Targeted harmful content</p>
            </div>
          </div>
          <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgCard }}>
            <span className="inline-block w-4 h-4 rounded-full mr-3" style={{ backgroundColor: colors.warning }}></span>
            <div>
              <span className="font-medium" style={{ color: colors.text }}>Fake News</span>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Fabricated news stories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;

