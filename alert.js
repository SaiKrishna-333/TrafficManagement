// Mock data for safety alerts (in a real app, this would come from a server/API)
const mockAlerts = [
    {
        id: 1,
        type: "accident",
        severity: "high",
        location: "Highway 101, Mile Marker 25",
        message: "Multiple vehicle collision. Right lanes blocked. Expect major delays of 45+ minutes. Emergency services on scene.",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString() // 30 minutes ago
    },
    {
        id: 2,
        type: "closure",
        severity: "medium",
        location: "Main Street between 5th and 8th Ave",
        message: "Road closed for scheduled maintenance. Detour available via Pine Street. Expected to reopen at 5 PM.",
        timestamp: new Date(Date.now() - 120 * 60000).toISOString() // 2 hours ago
    },
    {
        id: 3,
        type: "construction",
        severity: "low",
        location: "Riverside Drive near Downtown",
        message: "Road work in progress. Speed limit reduced to 25 mph. Expect minor delays during peak hours.",
        timestamp: new Date(Date.now() - 180 * 60000).toISOString() // 3 hours ago
    },
    {
        id: 4,
        type: "weather",
        severity: "medium",
        location: "Citywide",
        message: "Heavy rainfall expected this afternoon. Potential for flash flooding in low-lying areas. Drive with caution.",
        timestamp: new Date(Date.now() - 90 * 60000).toISOString() // 1.5 hours ago
    },
    {
        id: 5,
        type: "accident",
        severity: "low",
        location: "Oak Street and 12th Avenue",
        message: "Minor fender bender. Vehicles moved to shoulder. Minimal impact on traffic flow.",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString() // 45 minutes ago
    }
];

// Initialize the alerts system
document.addEventListener("DOMContentLoaded", function() {
    // Load and display alerts
    displayAlerts(mockAlerts);
    
    // Set up filter event listeners
    document.getElementById("alert-type").addEventListener("change", filterAlerts);
    document.getElementById("alert-severity").addEventListener("change", filterAlerts);
    
    // Set up subscription form
    document.getElementById("alert-subscribe").addEventListener("submit", function(e) {
        e.preventDefault();
        const email = e.target.querySelector("input[type='email']").value;
        alert(`Thank you! You've successfully subscribed to safety alerts with: ${email}`);
        e.target.reset();
    });
    
    // Set up geolocation to get local alerts
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // In a real app, you would use these coordinates to fetch local alerts
            console.log("User location:", position.coords.latitude, position.coords.longitude);
        });
    }
});

// Display alerts in the UI
function displayAlerts(alerts) {
    const alertsList = document.getElementById("alerts-list");
    alertsList.innerHTML = "";
    
    if (alerts.length === 0) {
        alertsList.innerHTML = "<p>No alerts match your current filters.</p>";
        return;
    }
    
    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.className = `alert-item ${alert.severity}`;
        li.dataset.type = alert.type;
        li.dataset.severity = alert.severity;
        
        const alertTime = new Date(alert.timestamp);
        const timeAgo = getTimeAgo(alertTime);
        
        li.innerHTML = `
            <div class="alert-header">
                <span class="alert-location">${alert.location}</span>
                <span class="alert-time">${timeAgo}</span>
            </div>
            <div class="alert-type-badge">${formatAlertType(alert.type)} - ${formatSeverity(alert.severity)}</div>
            <p class="alert-message">${alert.message}</p>
        `;
        
        alertsList.appendChild(li);
    });
}

// Filter alerts based on user selection
function filterAlerts() {
    const typeFilter = document.getElementById("alert-type").value;
    const severityFilter = document.getElementById("alert-severity").value;
    
    let filteredAlerts = [...mockAlerts];
    
    // Filter by type if not set to "all"
    if (typeFilter !== "all") {
        filteredAlerts = filteredAlerts.filter(alert => alert.type === typeFilter);
    }
    
    // Filter by severity if not set to "all"
    if (severityFilter !== "all") {
        filteredAlerts = filteredAlerts.filter(alert => alert.severity === severityFilter);
    }
    
    // Display filtered alerts
    displayAlerts(filteredAlerts);
}

// Format the time ago string
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) {
        return "Just now";
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
        const diffHours = Math.floor(diffMins / 60);
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
}

// Format alert type for display
function formatAlertType(type) {
    const typeLabels = {
        "accident": "Accident",
        "closure": "Road Closure",
        "construction": "Construction",
        "weather": "Weather Alert"
    };
    
    return typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

// Format severity for display
function formatSeverity(severity) {
    const severityLabels = {
        "high": "High Impact",
        "medium": "Medium Impact",
        "low": "Low Impact"
    };
    
    return severityLabels[severity] || severity.charAt(0).toUpperCase() + severity.slice(1);
}