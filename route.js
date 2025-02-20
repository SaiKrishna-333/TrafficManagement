// Initialize map and route functionality
let map;
let routeLayer;

document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    map = L.map('route-map').setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Check if there's a destination in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('destination')) {
        document.getElementById('destination').value = urlParams.get('destination');
        
        // Try to get user's current location for the starting point
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                document.getElementById('start').value = `${lat},${lng}`;
                
                // Show user location on map
                L.marker([lat, lng]).addTo(map)
                    .bindPopup("Your Location").openPopup();
                map.setView([lat, lng], 13);
            }, function() {
                console.log("Geolocation permission denied");
            });
        }
    }
    
    // Handle form submission
    document.getElementById("route-form").addEventListener("submit", calculateRoute);
});

// Calculate and display route
async function calculateRoute(event) {
    event.preventDefault();
    
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;
    const travelMode = document.getElementById("travel-mode").value;
    
    if (!start || !destination) {
        alert("Please enter both start and destination locations.");
        return;
    }
    
    // In a real app, you would use a proper routing API
    // This is a demo implementation with simulated data
    simulateRouteCalculation(start, destination, travelMode);
}

// Simulate route calculation (replace with actual API in production)
function simulateRouteCalculation(start, destination, travelMode) {
    const resultDiv = document.getElementById("route-result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "<p>Calculating your optimal route...</p>";
    
    // Geocode the locations (in a real app, use a geocoding service)
    setTimeout(() => {
        // Parse coordinates or use mock coordinates if text locations provided
        let startCoords, destCoords;
        
        if (start.includes(',')) {
            const [lat, lng] = start.split(',').map(coord => parseFloat(coord.trim()));
            startCoords = [lat, lng];
        } else {
            // Mock geocoding - in production use a proper geocoding service
            startCoords = [40.7128, -74.0060]; // New York City
        }
        
        if (destination.includes(',')) {
            const [lat, lng] = destination.split(',').map(coord => parseFloat(coord.trim()));
            destCoords = [lat, lng];
        } else {
            // Mock geocoding with slight offset from start
            destCoords = [40.7580, -73.9855]; // Few miles away
        }
        
        // Calculate a mock route
        const distance = calculateDistance(startCoords[0], startCoords[1], destCoords[0], destCoords[1]);
        const duration = calculateDuration(distance, travelMode);
        const trafficFactor = Math.random() * 0.4 + 0.8; // Random factor between 0.8 and 1.2
        const trafficAdjustedDuration = Math.round(duration * trafficFactor);
        
        // Generate route points (simplified straight line with some variation)
        const routePoints = generateRoutePoints(startCoords, destCoords);
        
        // Update result display
        resultDiv.innerHTML = `
            <h3>Optimal Route Found</h3>
            <p><strong>From:</strong> ${start}</p>
            <p><strong>To:</strong> ${destination}</p>
            <p><strong>Distance:</strong> ${distance.toFixed(2)} km</p>
            <p><strong>Estimated Time:</strong> ${formatDuration(trafficAdjustedDuration)}</p>
            <p><strong>Traffic Conditions:</strong> ${getTrafficDescription(trafficFactor)}</p>
            <p><strong>Travel Mode:</strong> ${travelMode.charAt(0).toUpperCase() + travelMode.slice(1)}</p>
        `;
        
        // Display route on map
        displayRouteOnMap(routePoints, startCoords, destCoords);
        
    }, 1500); // Simulate API delay
}

// Calculate approximate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Calculate duration based on distance and travel mode
function calculateDuration(distance, mode) {
    // Average speeds in km/h for different modes
    const speeds = {
        driving: 50,
        cycling: 15,
        walking: 5,
        transit: 30
    };
    
    // Calculate hours then convert to minutes
    return Math.round((distance / speeds[mode]) * 60);
}

// Format duration in minutes to human-readable format
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
}

// Get description of traffic conditions based on traffic factor
function getTrafficDescription(factor) {
    if (factor < 0.9) return "Light traffic (faster than usual)";
    if (factor < 1.0) return "Normal traffic conditions";
    if (factor < 1.1) return "Moderate traffic";
    return "Heavy traffic (expect delays)";
}

// Generate points along the route (simplified)
function generateRoutePoints(start, end) {
    const points = [start];
    const numPoints = 5; // Number of additional points to generate
    
    for (let i = 1; i <= numPoints; i++) {
        const ratio = i / (numPoints + 1);
        // Add some randomness to make route look more realistic
        const jitter = [
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
        ];
        const point = [
            start[0] + (end[0] - start[0]) * ratio + jitter[0],
            start[1] + (end[1] - start[1]) * ratio + jitter[1]
        ];
        points.push(point);
    }
    
    points.push(end);
    return points;
}

// Display the route on the map
function displayRouteOnMap(routePoints, start, end) {
    // Clear previous route if exists
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }
    
    // Create route polyline
    const routeLatLngs = routePoints.map(point => [point[0], point[1]]);
    routeLayer = L.polyline(routeLatLngs, {
        color: '#0066ff',
        weight: 5,
        opacity: 0.7
    }).addTo(map);
    
    // Add markers for start and end points
    const startMarker = L.marker([start[0], start[1]]).addTo(map)
        .bindPopup("Start").openPopup();
        
    const endMarker = L.marker([end[0], end[1]]).addTo(map)
        .bindPopup("Destination");
    
    // Fit map to show the entire route
    const bounds = L.latLngBounds(routeLatLngs);
    map.fitBounds(bounds, {
        padding: [50, 50]
    });
}