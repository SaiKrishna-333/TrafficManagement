TrafficEase
    TrafficEase is a web-based application designed to help users navigate city traffic efficiently. It provides real-time traffic updates, route optimization, safety alerts, and public transport information.         The application is built using HTML, CSS, JavaScript, and Leaflet.js for map integration.

Features
    Real-Time Traffic Map:
      View live traffic conditions on an interactive map.
      Click anywhere on the map to get detailed traffic information for that location.
      Traffic levels are color-coded (Free Flowing, Moderate, Heavy, Severe Congestion).
    Route Optimizer:
      Plan your journey with real-time traffic conditions.
      Choose from different travel modes: Driving, Walking, Cycling, and Public Transit.
      Get estimated travel time and distance for your route.
    Safety Alerts:
      Stay informed about traffic incidents, road closures, and hazardous conditions.
      Filter alerts by type (Accidents, Road Closures, Construction, Weather) and severity (High, Medium, Low).
    Public Transport Tracker:
      Get real-time updates on nearby public transportation options.
      View arrival times, next arrivals, and status updates for buses, subways, and trains.
    User-Friendly Interface:
      Clean and intuitive design with smooth animations and transitions.
      Responsive layout for both desktop and mobile devices.

Technologies Used
    Frontend:
      HTML5
      CSS3
      JavaScript 
      Leaflet.js (for interactive maps)
    Styling:
      Custom CSS with gradients and animations.
    APIs:
      Mock API for traffic data.
      
Setup Instructions
    Prerequisites
      A modern web browser (e.g., Chrome, Firefox, Edge).
      An internet connection (for loading Leaflet.js and map tiles).

Steps to Run the Project
  Clone the Repository:
    git clone https://github.com/your-username/TrafficEase.git
    cd TrafficEase  
  Open the Project:
    Open the index.html file in your browser to start the application.
  Explore the Features:
    Navigate through the different sections using the navigation bar:
      Home: Quick search for destinations.
      Traffic Map: View real-time traffic conditions.
      Route Optimizer: Plan your journey.
      Safety Alerts: Stay updated on traffic incidents.
      Public Transport: Track nearby public transport options.

File Structure
TrafficEase/
├── index.html          # Home page with quick search functionality
├── map.html            # Real-time traffic map
├── route.html          # Route optimizer
├── alerts.html         # Safety alerts
├── transport.html      # Public transport tracker
├── styles.css          # Global styles for the application
├── map.js              # JavaScript for the traffic map
├── route.js            # JavaScript for the route optimizer
├── alerts.js           # JavaScript for safety alerts
└── README.md           # Project documentation

Usage
  Traffic Map
    Click anywhere on the map to view traffic information for that location.
    The map will display your current location if geolocation is enabled.
  Route Optimizer
    Enter your starting point and destination.
    Select your preferred travel mode (Driving, Walking, Cycling, Public Transit).
    Click "Find Optimal Route" to get the best route based on traffic conditions.
  Safety Alerts
    Use the filters to view specific types of alerts (e.g., Accidents, Road Closures).
    Subscribe to receive real-time alerts via email.
  Public Transport
    Search for nearby stops or stations.
    View arrival times and status updates for buses, subways, and trains.

Future Enhancements
    Integrate a real-time traffic API for accurate traffic data.
    Add user authentication to save favorite routes and preferences.
    Implement a dark mode for better usability at night.
    Add support for multiple cities and regions.
