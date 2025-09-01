import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({ theme }) => {
  const [geographyData, setGeographyData] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Default colors in case theme is not provided
  const colors = theme || {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#f59e0b',
    background: '#1f2937',
    surface: '#374151',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    border: '#4b5563',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  // Enhanced incident data with more detailed information
  const incidentData = [
    { 
      id: 1, 
      lat: 3.848, 
      lng: 11.502, 
      type: 'misinformation', 
      count: 45, 
      region: 'Centre', 
      city: 'Yaoundé',
      population: '2.8M',
      description: 'Capital city with high social media activity',
      recentIncidents: [
        { date: '2024-01-15', type: 'misinformation', description: 'False election information spread on WhatsApp', severity: 'high' },
        { date: '2024-01-12', type: 'hate_speech', description: 'Ethnic tension posts on Facebook', severity: 'medium' },
        { date: '2024-01-10', type: 'fake_news', description: 'Health misinformation about local clinics', severity: 'low' }
      ],
      platforms: ['Facebook', 'WhatsApp', 'Twitter'],
      riskLevel: 'high',
      responseTime: '2.3s',
      localAuthorities: ['Ministry of Communication', 'Local Police Cyber Unit'],
      recommendations: [
        'Increase monitoring during election periods',
        'Strengthen local fact-checking initiatives',
        'Enhance community awareness programs'
      ]
    },
    { 
      id: 2, 
      lat: 4.0511, 
      lng: 9.7679, 
      type: 'hate_speech', 
      count: 32, 
      region: 'Littoral', 
      city: 'Douala',
      population: '3.3M',
      description: 'Economic hub with diverse population',
      recentIncidents: [
        { date: '2024-01-14', type: 'hate_speech', description: 'Economic scapegoating posts', severity: 'high' },
        { date: '2024-01-11', type: 'misinformation', description: 'False business opportunity scams', severity: 'medium' },
        { date: '2024-01-08', type: 'fake_news', description: 'Fake job announcements', severity: 'low' }
      ],
      platforms: ['Facebook', 'Instagram', 'LinkedIn'],
      riskLevel: 'medium',
      responseTime: '3.1s',
      localAuthorities: ['Economic Affairs Ministry', 'Business Protection Unit'],
      recommendations: [
        'Focus on economic misinformation detection',
        'Partner with business associations',
        'Monitor employment-related scams'
      ]
    },
    { 
      id: 3, 
      lat: 7.3697, 
      lng: 12.354, 
      type: 'fake_news', 
      count: 28, 
      region: 'Nord', 
      city: 'Garoua',
      population: '600K',
      description: 'Northern regional capital',
      recentIncidents: [
        { date: '2024-01-13', type: 'fake_news', description: 'False security alerts', severity: 'high' },
        { date: '2024-01-09', type: 'misinformation', description: 'Agricultural price manipulation', severity: 'medium' },
        { date: '2024-01-06', type: 'hate_speech', description: 'Religious tension posts', severity: 'low' }
      ],
      platforms: ['WhatsApp', 'Facebook', 'Telegram'],
      riskLevel: 'medium',
      responseTime: '4.2s',
      localAuthorities: ['Regional Security Council', 'Agricultural Ministry'],
      recommendations: [
        'Monitor security-related misinformation',
        'Protect agricultural market information',
        'Promote inter-religious dialogue'
      ]
    },
    { 
      id: 4, 
      lat: 5.9631, 
      lng: 10.1591, 
      type: 'misinformation', 
      count: 19, 
      region: 'Adamaoua', 
      city: 'Ngaoundéré',
      population: '400K',
      description: 'University town with student population',
      recentIncidents: [
        { date: '2024-01-12', type: 'misinformation', description: 'False academic announcements', severity: 'medium' },
        { date: '2024-01-08', type: 'fake_news', description: 'Fake scholarship opportunities', severity: 'high' },
        { date: '2024-01-05', type: 'hate_speech', description: 'Student group conflicts', severity: 'low' }
      ],
      platforms: ['Instagram', 'TikTok', 'WhatsApp'],
      riskLevel: 'low',
      responseTime: '3.8s',
      localAuthorities: ['University Administration', 'Student Affairs'],
      recommendations: [
        'Protect students from academic scams',
        'Monitor student social media activity',
        'Enhance campus digital literacy'
      ]
    },
    { 
      id: 5, 
      lat: 6.1319, 
      lng: 12.3991, 
      type: 'hate_speech', 
      count: 15, 
      region: 'Est', 
      city: 'Bertoua',
      population: '350K',
      description: 'Forest region with mining activities',
      recentIncidents: [
        { date: '2024-01-11', type: 'hate_speech', description: 'Mining community tensions', severity: 'medium' },
        { date: '2024-01-07', type: 'misinformation', description: 'False environmental claims', severity: 'low' },
        { date: '2024-01-04', type: 'fake_news', description: 'Fake job opportunities in mining', severity: 'medium' }
      ],
      platforms: ['Facebook', 'WhatsApp', 'Telegram'],
      riskLevel: 'low',
      responseTime: '4.5s',
      localAuthorities: ['Mining Ministry', 'Environmental Protection'],
      recommendations: [
        'Monitor mining-related misinformation',
        'Protect environmental information',
        'Address community tensions'
      ]
    },
    { 
      id: 6, 
      lat: 10.5949, 
      lng: 14.2023, 
      type: 'fake_news', 
      count: 41, 
      region: 'Extrême-Nord', 
      city: 'Maroua',
      population: '500K',
      description: 'Border region with security challenges',
      recentIncidents: [
        { date: '2024-01-15', type: 'fake_news', description: 'False security threats', severity: 'critical' },
        { date: '2024-01-12', type: 'misinformation', description: 'Border crossing misinformation', severity: 'high' },
        { date: '2024-01-09', type: 'hate_speech', description: 'Cross-border tensions', severity: 'high' }
      ],
      platforms: ['WhatsApp', 'Telegram', 'Facebook'],
      riskLevel: 'critical',
      responseTime: '1.8s',
      localAuthorities: ['Border Security', 'Regional Military Command'],
      recommendations: [
        'Prioritize security-related misinformation',
        'Monitor border crossing information',
        'Coordinate with neighboring countries'
      ]
    },
    { 
      id: 7, 
      lat: 5.4467, 
      lng: 9.9348, 
      type: 'misinformation', 
      count: 22, 
      region: 'Ouest', 
      city: 'Bafoussam',
      population: '450K',
      description: 'Agricultural and cultural center',
      recentIncidents: [
        { date: '2024-01-13', type: 'misinformation', description: 'Agricultural price manipulation', severity: 'medium' },
        { date: '2024-01-10', type: 'fake_news', description: 'Cultural event misinformation', severity: 'low' },
        { date: '2024-01-07', type: 'hate_speech', description: 'Cultural group tensions', severity: 'medium' }
      ],
      platforms: ['Facebook', 'WhatsApp', 'Instagram'],
      riskLevel: 'medium',
      responseTime: '3.2s',
      localAuthorities: ['Agricultural Ministry', 'Cultural Affairs'],
      recommendations: [
        'Protect agricultural market information',
        'Monitor cultural event misinformation',
        'Promote cultural harmony'
      ]
    },
    { 
      id: 8, 
      lat: 6.2619, 
      lng: 9.2675, 
      type: 'hate_speech', 
      count: 18, 
      region: 'Nord-Ouest', 
      city: 'Bamenda',
      population: '400K',
      description: 'Educational and administrative center',
      recentIncidents: [
        { date: '2024-01-14', type: 'hate_speech', description: 'Political tension posts', severity: 'high' },
        { date: '2024-01-11', type: 'misinformation', description: 'False educational announcements', severity: 'medium' },
        { date: '2024-01-08', type: 'fake_news', description: 'Fake government announcements', severity: 'high' }
      ],
      platforms: ['WhatsApp', 'Facebook', 'Twitter'],
      riskLevel: 'high',
      responseTime: '2.7s',
      localAuthorities: ['Regional Government', 'Education Ministry'],
      recommendations: [
        'Monitor political misinformation',
        'Protect educational information',
        'Verify government announcements'
      ]
    },
    { 
      id: 9, 
      lat: 4.1560, 
      lng: 9.2874, 
      type: 'fake_news', 
      count: 25, 
      region: 'Sud-Ouest', 
      city: 'Buea',
      population: '300K',
      description: 'University and administrative center',
      recentIncidents: [
        { date: '2024-01-12', type: 'fake_news', description: 'False university announcements', severity: 'medium' },
        { date: '2024-01-09', type: 'misinformation', description: 'Student protest misinformation', severity: 'high' },
        { date: '2024-01-06', type: 'hate_speech', description: 'Academic community tensions', severity: 'low' }
      ],
      platforms: ['Instagram', 'WhatsApp', 'Facebook'],
      riskLevel: 'medium',
      responseTime: '3.4s',
      localAuthorities: ['University Administration', 'Regional Government'],
      recommendations: [
        'Protect academic information',
        'Monitor student activism',
        'Promote academic dialogue'
      ]
    },
    { 
      id: 10, 
      lat: 2.9167, 
      lng: 11.5167, 
      type: 'misinformation', 
      count: 12, 
      region: 'Sud', 
      city: 'Ebolowa',
      population: '250K',
      description: 'Forest and agricultural region',
      recentIncidents: [
        { date: '2024-01-10', type: 'misinformation', description: 'Agricultural market misinformation', severity: 'low' },
        { date: '2024-01-07', type: 'fake_news', description: 'False environmental claims', severity: 'medium' },
        { date: '2024-01-04', type: 'hate_speech', description: 'Community tensions', severity: 'low' }
      ],
      platforms: ['WhatsApp', 'Facebook'],
      riskLevel: 'low',
      responseTime: '4.8s',
      localAuthorities: ['Agricultural Ministry', 'Environmental Protection'],
      recommendations: [
        'Monitor agricultural information',
        'Protect environmental data',
        'Address community concerns'
      ]
    }
  ];

  // Regional data aggregated from incidents
  const regionalData = {
    'Centre': { misinformation: 45, hate_speech: 12, fake_news: 8, total: 65 },
    'Littoral': { misinformation: 23, hate_speech: 32, fake_news: 15, total: 70 },
    'Nord': { misinformation: 18, hate_speech: 9, fake_news: 28, total: 55 },
    'Adamaoua': { misinformation: 19, hate_speech: 7, fake_news: 11, total: 37 },
    'Est': { misinformation: 14, hate_speech: 15, fake_news: 6, total: 35 },
    'Extrême-Nord': { misinformation: 25, hate_speech: 16, fake_news: 41, total: 82 },
    'Ouest': { misinformation: 22, hate_speech: 13, fake_news: 9, total: 44 },
    'Nord-Ouest': { misinformation: 16, hate_speech: 18, fake_news: 12, total: 46 },
    'Sud-Ouest': { misinformation: 20, hate_speech: 14, fake_news: 25, total: 59 },
    'Sud': { misinformation: 12, hate_speech: 8, fake_news: 5, total: 25 }
  };

  const handleMarkerClick = (incident) => {
    setSelectedLocation(incident);
    setShowLocationModal(true);
  };

  const closeModal = () => {
    setShowLocationModal(false);
    setSelectedLocation(null);
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'critical': return colors.error;
      case 'high': return '#f59e0b';
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textMuted;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return colors.error;
      case 'high': return '#f59e0b';
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textMuted;
    }
  };

  useEffect(() => {
    // Make sure the GeoJSON file path is correct and accessible.
    // If you are using 'public/cameroon_admin1.geojson', fetch('/cameroon_admin1.geojson') is correct.
    // If the file does not exist or is not valid JSON, you'll get the "<!DOCTYPE ..." error.
    fetch('/cameroon_admin1.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error('GeoJSON file not found or not accessible');
        }
        return response.json();
      })
      .then(data => {
        // Filter for Cameroon only from world data
        const cameroonFeatures = data.features.filter(feature => 
          feature.properties.NAME === 'Cameroon' || 
          feature.properties.name === 'Cameroon' ||
          feature.properties.ADMIN === 'Cameroon'
        );
        
        if (cameroonFeatures.length > 0) {
          setGeographyData({
            type: 'FeatureCollection',
            features: cameroonFeatures
          });
          setLoading(false);
        } else {
          // If no Cameroon found, use the existing cm.json
          fetch('/cm.json')
            .then(response => {
              if (!response.ok) {
                throw new Error('Fallback GeoJSON file not found or not accessible');
              }
              return response.json();
            })
            .then(data => {
              const geoData = data.type === 'Feature' 
                ? { type: 'FeatureCollection', features: [data] }
                : data;
              setGeographyData(geoData);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error loading fallback geography data:', error);
              setLoading(false);
            });
        }
      })
      .catch(error => {
        console.error('Error loading geography data:', error);
        setLoading(false);
      });
  }, []);

  const getRegionColor = (regionName) => {
    const data = regionalData[regionName];
    if (!data) return colors.surface;
    
    const total = data.total;
    if (total >= 70) return '#ef4444'; // High risk - red
    if (total >= 50) return '#f59e0b'; // Medium risk - yellow
    if (total >= 30) return colors.primary; // Low risk - blue
    return '#10b981'; // Very low risk - green
  };

  const getMarkerIcon = (type) => {
    const iconColors = {
      misinformation: colors.primary,
      hate_speech: colors.error,
      fake_news: colors.warning
    };

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${iconColors[type]};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
          cursor: pointer;
        "></div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        </style>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const regionName = feature.properties.NAME || feature.properties.name || 'Unknown Region';
        setHoveredRegion(regionName);
        
        // Add glow effect
        e.target.setStyle({
          weight: 3,
          color: colors.primary,
          fillOpacity: 0.8,
          fillColor: getRegionColor(regionName)
        });
      },
      mouseout: (e) => {
        setHoveredRegion(null);
        
        // Reset style
        e.target.setStyle({
          weight: 1,
          color: colors.border,
          fillOpacity: 0.6,
          fillColor: getRegionColor(feature.properties.NAME || feature.properties.name)
        });
      }
    });
  };

  const geoJsonStyle = (feature) => {
    const regionName = feature.properties.NAME || feature.properties.name || 'Unknown Region';
    return {
      fillColor: getRegionColor(regionName),
      weight: 1,
      opacity: 1,
      color: colors.border,
      fillOpacity: 0.6
    };
  };

  if (loading) {
    return (
      <div 
        className="w-full h-96 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary }}
          ></div>
          <p style={{ color: colors.textSecondary }}>Loading interactive map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Map Container */}
      <div 
        className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl border"
        style={{ 
          backgroundColor: colors.surface,
          borderColor: colors.border,
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${colors.border}`
        }}
      >
        <MapContainer
          center={[7.3697, 12.354]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {geographyData && (
            <GeoJSON
              data={geographyData}
              style={geoJsonStyle}
              onEachFeature={onEachFeature}
            />
          )}

          {/* Incident Markers */}
          {incidentData.map(incident => (
            <Marker
              key={incident.id}
              position={[incident.lat, incident.lng]}
              icon={getMarkerIcon(incident.type)}
              eventHandlers={{
                click: () => handleMarkerClick(incident)
              }}
            >
              <Popup>
                <div style={{ color: colors.text, backgroundColor: colors.surface }} className="p-2">
                  <h3 className="font-bold text-lg mb-2">{incident.city}</h3>
                  <p><strong>Region:</strong> {incident.region}</p>
                  <p><strong>Type:</strong> {incident.type.replace('_', ' ')}</p>
                  <p><strong>Incidents:</strong> {incident.count}</p>
                  <p><strong>Risk Level:</strong> 
                    <span style={{ color: getRiskLevelColor(incident.riskLevel) }}>
                      {incident.riskLevel.toUpperCase()}
                    </span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          <ZoomControl position="topright" />
        </MapContainer>

        {/* Hover Tooltip */}
        {hoveredRegion && regionalData[hoveredRegion] && (
          <div 
            className="absolute top-4 left-4 p-4 rounded-lg shadow-lg z-[1000]"
            style={{ 
              backgroundColor: colors.surface,
              borderColor: colors.border,
              border: `1px solid ${colors.border}`
            }}
          >
            <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>
              {hoveredRegion}
            </h3>
            <div className="space-y-1 text-sm">
              <p style={{ color: colors.textSecondary }}>
                <span style={{ color: colors.primary }}>●</span> Misinformation: {regionalData[hoveredRegion].misinformation}
              </p>
              <p style={{ color: colors.textSecondary }}>
                <span style={{ color: colors.error }}>●</span> Hate Speech: {regionalData[hoveredRegion].hate_speech}
              </p>
              <p style={{ color: colors.textSecondary }}>
                <span style={{ color: colors.warning }}>●</span> Fake News: {regionalData[hoveredRegion].fake_news}
              </p>
              <hr style={{ borderColor: colors.border }} />
              <p className="font-semibold" style={{ color: colors.text }}>
                Total: {regionalData[hoveredRegion].total} incidents
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Location Detail Modal */}
      {showLocationModal && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
          <div 
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
            style={{ backgroundColor: colors.surface }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
                    {selectedLocation.city}
                  </h2>
                  <p className="text-lg" style={{ color: colors.textSecondary }}>
                    {selectedLocation.region} Region • {selectedLocation.population} Population
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-opacity-20 transition-colors"
                  style={{ backgroundColor: `${colors.textMuted}20` }}
                >
                  <svg className="w-6 h-6" style={{ color: colors.text }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Overview */}
                <div className="space-y-6">
                  {/* Overview Card */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Location Overview</h3>
                    <p className="mb-4" style={{ color: colors.textSecondary }}>
                      {selectedLocation.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm" style={{ color: colors.textMuted }}>Total Incidents</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>{selectedLocation.count}</p>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: colors.textMuted }}>Response Time</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>{selectedLocation.responseTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Risk Assessment</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span style={{ color: colors.textSecondary }}>Risk Level:</span>
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ 
                            backgroundColor: `${getRiskLevelColor(selectedLocation.riskLevel)}20`,
                            color: getRiskLevelColor(selectedLocation.riskLevel)
                          }}
                        >
                          {selectedLocation.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: colors.textSecondary }}>Primary Threat:</span>
                        <span style={{ color: colors.text }}>{selectedLocation.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: colors.textSecondary }}>Active Platforms:</span>
                        <span style={{ color: colors.text }}>{selectedLocation.platforms.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Local Authorities */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Local Authorities</h3>
                    <div className="space-y-2">
                      {selectedLocation.localAuthorities.map((authority, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                          <span style={{ color: colors.textSecondary }}>{authority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                  {/* Recent Incidents */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Recent Incidents</h3>
                    <div className="space-y-3">
                      {selectedLocation.recentIncidents.map((incident, index) => (
                        <div key={index} className="p-3 rounded border" style={{ borderColor: colors.border }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium" style={{ color: colors.text }}>
                              {incident.type.replace('_', ' ')}
                            </span>
                            <span 
                              className="px-2 py-1 rounded text-xs font-semibold"
                              style={{ 
                                backgroundColor: `${getSeverityColor(incident.severity)}20`,
                                color: getSeverityColor(incident.severity)
                              }}
                            >
                              {incident.severity}
                            </span>
                          </div>
                          <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                            {incident.description}
                          </p>
                          <p className="text-xs" style={{ color: colors.textMuted }}>
                            {incident.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Recommendations</h3>
                    <div className="space-y-2">
                      {selectedLocation.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.success }}></div>
                          <span className="text-sm" style={{ color: colors.textSecondary }}>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platform Activity */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Active Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.platforms.map((platform, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${colors.primary}20`,
                            color: colors.primary
                          }}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
                <button
                  className="px-6 py-2 rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: 'white'
                  }}
                >
                  View Detailed Report
                </button>
                <button
                  className="px-6 py-2 rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: colors.bgTertiary,
                    color: colors.text
                  }}
                >
                  Export Data
                </button>
                <button
                  className="px-6 py-2 rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: colors.bgTertiary,
                    color: colors.text
                  }}
                >
                  Set Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.surface, borderColor: colors.border, border: `1px solid ${colors.border}` }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
          Interactive Map Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3" style={{ color: colors.textSecondary }}>Threat Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Misinformation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.error }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Hate Speech</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.warning }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Fake News</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3" style={{ color: colors.textSecondary }}>Region Risk Levels</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>High Risk (70+ incidents)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Medium Risk (50-70 incidents)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Low Risk (30-50 incidents)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Very Low Risk (Less than 30 incidents)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
          <p className="text-sm" style={{ color: colors.textMuted }}>
            <strong>How to use:</strong> Hover over regions to see detailed incident data. Click on markers to view comprehensive location information including recent incidents, risk assessments, and recommendations. Use zoom controls to explore different areas in detail.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;

