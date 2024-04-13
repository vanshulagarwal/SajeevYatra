import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';



const Maps = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const userDotRef = useRef(null);
  const ambulanceMarkerRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    // Create a map instance
    mapRef.current = L.map('map').setView([28.6129, 77.2295], 13); // India Gate coordinates

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Get user's current location
    const fetchUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude, longitude } = position.coords;
            const userLocation = L.latLng(latitude, longitude);
            setUserLocation(userLocation);
            // Add fixed dot for user's current location
            if (!userDotRef.current) {
              userDotRef.current = L.circleMarker(userLocation, { radius: 5, color: 'blue' }).addTo(mapRef.current);
            } else {
              userDotRef.current.setLatLng(userLocation);
            }
          },
          function (error) {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation(); // Fetch user's location initially

    // Add marker for India Gate (starting point of ambulance)
    const indiaGateLocation = L.latLng(28.6129, 77.2295); // India Gate coordinates
    ambulanceMarkerRef.current = L.marker(indiaGateLocation, { draggable: false }).addTo(mapRef.current);

    // Calculate and display route between user and India Gate
    if (userLocation) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          indiaGateLocation
        ],
        routeWhileDragging: true
      }).addTo(mapRef.current);
    }

    // Function to calculate new ambulance position closer to the user's location
    const calculateNewAmbulancePosition = (currentAmbulanceLocation, userLocation) => {
      const latDiff = userLocation.lat - currentAmbulanceLocation.lat;
      const lngDiff = userLocation.lng - currentAmbulanceLocation.lng;
      const newLat = currentAmbulanceLocation.lat + latDiff * 0.1; // Move 10% closer
      const newLng = currentAmbulanceLocation.lng + lngDiff * 0.1; // Move 10% closer
      return L.latLng(newLat, newLng);
    };

    // Function to continuously update ambulance's position and route
    const updateAmbulancePosition = () => {
      // Simulate fetching ambulance's position from the backend
      const currentAmbulanceLocation = ambulanceMarkerRef.current.getLatLng();
      const newAmbulanceLocation = calculateNewAmbulancePosition(currentAmbulanceLocation, userLocation);

      // Update ambulance marker
      if (ambulanceMarkerRef.current) {
        ambulanceMarkerRef.current.setLatLng(newAmbulanceLocation);
      } else {
        ambulanceMarkerRef.current = L.marker(newAmbulanceLocation, { draggable: false }).addTo(mapRef.current);
      }

      // Update route between user and ambulance
      if (userLocation && routingControlRef.current) {
        routingControlRef.current.setWaypoints([
          L.latLng(userLocation),
          newAmbulanceLocation
        ]);
      }
    };

    // Update ambulance position every 5 seconds (for testing)
    const intervalId = setInterval(updateAmbulancePosition, 5000);

    return () => {
      clearInterval(intervalId); // Cleanup interval
      // Cleanup map instance
      mapRef.current.remove();
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '65vh' }}></div>


      
    </div>
  );
};

export default Maps;