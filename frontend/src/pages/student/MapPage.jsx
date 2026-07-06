// src/pages/student/MapPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const KTU_CENTER = { lat: 6.0900, lng: -0.2573 };

const MAP_OPTIONS = {
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#4b6878' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#283d6a' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6f9ba5' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#304a7d' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#98a5be' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0e1626' }]
    }
  ],
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true
};

export default function MapPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [map, setMap] = useState(null);

  // Load Google Maps API Script
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  useEffect(() => {
    fetchMapProperties();
  }, []);

  const fetchMapProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get('/properties/map');
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error('Error fetching map properties:', err);
      toast.error('Failed to load map listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProperty = (prop) => {
    setSelectedProperty(prop);
    if (map) {
      map.panTo({ lat: parseFloat(prop.latitude), lng: parseFloat(prop.longitude) });
      map.setZoom(16);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-loader">
          <div className="spinner-ring"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0" style={{ height: 'calc(100vh - 65px)', overflow: 'hidden' }}>
        <div className="d-flex h-100 flex-column flex-md-row">
          
          {/* Left Panel: List of hostels */}
          <div className="d-flex flex-column bg-surface border-custom" style={{ width: '100%', maxWidth: '380px', height: '100%' }}>
            <div className="p-3 border-bottom border-custom">
              <h5 className="mb-1" style={{ fontFamily: 'Outfit,sans-serif' }}>Explore Nearby Hostels</h5>
              <p className="text-muted-custom mb-0" style={{ fontSize: '0.8rem' }}>
                Showing <strong>{properties.length}</strong> available properties on the map near KTU campus.
              </p>
            </div>
            
            <div className="flex-grow-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              {properties.length === 0 ? (
                <div className="text-center py-5 text-muted-custom">
                  No hostels currently available.
                </div>
              ) : (
                properties.map(p => {
                  const heroImg = p.property_images?.sort((a,b) => a.display_order - b.display_order)[0]?.image_path 
                    || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300';
                  
                  return (
                    <div 
                      key={p.property_id}
                      className={`p-3 mb-2 rounded-custom bg-surface-2 border-custom cursor-pointer transition ${selectedProperty?.property_id === p.property_id ? 'border-hover shadow' : ''}`}
                      onClick={() => handleSelectProperty(p)}
                    >
                      <div className="d-flex gap-3">
                        <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="flex-grow-1 overflow-hidden" style={{ minWidth: 0 }}>
                          <h6 className="mb-1 text-truncate" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{p.title}</h6>
                          <div className="text-muted-custom mb-1 text-truncate" style={{ fontSize: '0.78rem' }}>
                            📍 {p.neighborhood} • {p.distance_from_campus_km ? `${p.distance_from_campus_km} km` : 'Near KTU'}
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-orange fw-bold" style={{ fontSize: '0.9rem' }}>GHS {p.price_per_semester}</span>
                            <span style={{ fontSize: '0.72rem' }} className="badge bg-secondary">{p.room_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Google Map */}
          <div className="flex-grow-1 h-100 position-relative">
            {loadError ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 bg-surface-2 p-4 text-center">
                <ShieldAlert size={48} className="text-danger mb-3" />
                <h5>Failed to Load Google Maps</h5>
                <p className="text-muted-custom mx-auto mb-3" style={{ maxWidth: '400px', fontSize: '0.9rem' }}>
                  Please ensure your Google Maps API key is correct and valid in your `.env` configuration.
                </p>
              </div>
            ) : !isLoaded ? (
              <div className="d-flex align-items-center justify-content-center h-100 bg-surface-2">
                <div className="spinner-ring"></div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={KTU_CENTER}
                zoom={14}
                options={MAP_OPTIONS}
                onLoad={map => setMap(map)}
              >
                {/* Campus Marker */}
                <Marker
                  position={KTU_CENTER}
                  title="Koforidua Technical University"
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/school.png',
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                />

                {/* Properties Markers */}
                {properties.map(p => (
                  <Marker
                    key={p.property_id}
                    position={{ lat: parseFloat(p.latitude), lng: parseFloat(p.longitude) }}
                    title={p.title}
                    onClick={() => setSelectedProperty(p)}
                  />
                ))}

                {/* Selected Property Info Window */}
                {selectedProperty && (
                  <InfoWindow
                    position={{ lat: parseFloat(selectedProperty.latitude), lng: parseFloat(selectedProperty.longitude) }}
                    onCloseClick={() => setSelectedProperty(null)}
                  >
                    <div style={{ color: '#111', maxWidth: '220px', padding: '2px' }}>
                      <h6 style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '0.9rem', color: '#1A1A2E' }}>
                        {selectedProperty.title}
                      </h6>
                      <p style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#555' }}>
                        📍 {selectedProperty.neighborhood} ({selectedProperty.room_type})
                        <br />
                        🚶 {selectedProperty.distance_from_campus_km ? `${selectedProperty.distance_from_campus_km} km` : 'Near Campus'}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <strong style={{ color: 'var(--brand-orange)', fontSize: '0.85rem' }}>
                          GHS {selectedProperty.price_per_semester}
                        </strong>
                        <Link 
                          to={`/property/${selectedProperty.property_id}`}
                          style={{ fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none', color: '#FF6B35' }}
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}

            {/* Float Info Box */}
            <div className="position-absolute bottom-0 end-0 m-3 p-3 glass-card text-white border-custom" style={{ zIndex: 10, maxWidth: '280px', pointerEvents: 'none' }}>
              <div className="d-flex gap-2 align-items-start">
                <Navigation size={18} className="text-orange flex-shrink-0" />
                <div style={{ fontSize: '0.8rem' }}>
                  <strong>KTU Landmark Pin</strong>
                  <div className="text-muted-custom mt-1">
                    The blue school icon marks the center of Koforidua Technical University campus.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
