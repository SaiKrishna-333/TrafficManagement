// Initialize the map using Leaflet.js
function initMap() {
    // Set the initial map view (latitude, longitude, zoom level)
    const map = L.map('map').setView([40.7128, -74.0060], 13); // New York City coordinates

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add scale control to the map
    L.control.scale().addTo(map);

    // Add user location control
    map.locate({setView: true, maxZoom: 16});
    
    // Handler for when location is found
    map.on('locationfound', function(e) {
        const radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
        
        // Get traffic data for current location
        getTrafficData(map, e.latlng.lat, e.latlng.lng);
    });
    
    // Handler for when location isn't found
    map.on('locationerror', function(e) {
        console.log('Location access denied or unavailable');
        // Load default traffic data
        getTrafficData(map, 40.7128, -74.0060);
    });

    // Add click handler to get traffic data for clicked location
    map.on('click', function(e) {
        getTrafficData(map, e.latlng.lat, e.latlng.lng);
    });
}

// Fetch real-time traffic data from mock API (replace with real API in production)
async function getTrafficData(map, lat, lng) {
    // In a real application, you would use a valid API key and proper endpoint
    // For demo purposes, using mock data
    
    try {
        // Simulate API call with mock data
        const mockData = {
            flowSegmentData: {
                currentSpeed: Math.floor(Math.random() * 60) + 10,
                freeFlowSpeed: 65,
                confidence: 0.9,
                roadClosure: false,
                coordinates: {
                    latitude: lat,
                    longitude: lng
                }
            }
        };
        
        console.log("Traffic Data:", mockData);
        
        // Calculate traffic level
        const trafficLevel = calculateTrafficLevel(mockData.flowSegmentData.currentSpeed, mockData.flowSegmentData.freeFlowSpeed);
        
        // Clear existing traffic markers
        map.eachLayer(function(layer) {
            if(layer instanceof L.Marker && layer.options.icon && layer.options.icon.options.className === 'traffic-marker') {
                map.removeLayer(layer);
            }
        });
        
        // Create traffic icon based on congestion level
        const trafficIcon = L.divIcon({
            html: `<div style="background-color:${trafficLevel.color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
            className: 'traffic-marker',
            iconSize: [20, 20]
        });
        
        // Add marker with traffic information
        L.marker([lat, lng], {icon: trafficIcon}).addTo(map)
            .bindPopup(`
                <h3>Traffic Information</h3>
                <p>Current Speed: ${mockData.flowSegmentData.currentSpeed} km/h</p>
                <p>Normal Speed: ${mockData.flowSegmentData.freeFlowSpeed} km/h</p>
                <p>Traffic Level: ${trafficLevel.label}</p>
            `)
            .openPopup();
            
        // Update traffic info panel
        document.getElementById('traffic-info').innerHTML = `
            <h3>Traffic Information</h3>
            <p>Current Speed: ${mockData.flowSegmentData.currentSpeed} km/h</p>
            <p>Normal Speed: ${mockData.flowSegmentData.freeFlowSpeed} km/h</p>
            <p>Traffic Level: ${trafficLevel.label}</p>
            <p>Updated: ${new Date().toLocaleTimeString()}</p>
        `;
    } catch (error) {
        console.error("Error fetching traffic data:", error);
        document.getElementById('traffic-info').innerHTML = `
            <h3>Traffic Information</h3>
            <p>Unable to fetch traffic data. Please try again later.</p>
        `;
    }
}

// Calculate traffic congestion level
function calculateTrafficLevel(currentSpeed, freeFlowSpeed) {
    const ratio = currentSpeed / freeFlowSpeed;
    
    if (ratio >= 0.85) {
        return { label: "Free flowing", color: "#4CAF50" };
    } else if (ratio >= 0.6) {
        return { label: "Moderate", color: "#FFC107" };
    } else if (ratio >= 0.3) {
        return { label: "Heavy", color: "#FF9800" };
    } else {
        return { label: "Severe congestion", color: "#F44336" };
    }
}

// Load the map when the page is fully loaded
document.addEventListener("DOMContentLoaded", initMap);