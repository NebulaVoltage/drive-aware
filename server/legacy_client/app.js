document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const connStatus = document.getElementById('connection-status');
    const connDot = document.getElementById('connection-dot');
    
    const valEyeStatus = document.getElementById('val-eye-status');
    const eyeIconBg = document.getElementById('eye-icon-bg');
    
    const valHeadTilt = document.getElementById('val-head-tilt');
    const tiltVisualizer = document.getElementById('tilt-visualizer');
    
    const valSeatPressure = document.getElementById('val-seat-pressure');
    const pressureVisualizer = document.getElementById('pressure-visualizer');

    // WebSocket Setup
    const WS_URL = 'ws://localhost:8765';
    let ws;
    let reconnectInterval;

    function connect() {
        console.log(`Attempting to connect to ${WS_URL}...`);
        ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log('WebSocket Connected');
            connStatus.textContent = 'Connected';
            connDot.className = 'dot connected';
            if (reconnectInterval) clearInterval(reconnectInterval);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                updateDashboard(data);
            } catch (e) {
                console.error('Error parsing telemetry data:', e);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket Disconnected. Reconnecting in 3s...');
            connStatus.textContent = 'Disconnected';
            connDot.className = 'dot disconnected';
            
            // Reset values to safe defaults on disconnect
            valEyeStatus.textContent = 'Unknown';
            eyeIconBg.className = 'card-icon neutral-gradient';
            
            valHeadTilt.textContent = '0';
            tiltVisualizer.style.width = '0%';
            
            valSeatPressure.textContent = '0';
            pressureVisualizer.style.width = '0%';

            // Try to reconnect
            if (!reconnectInterval) {
                reconnectInterval = setInterval(connect, 3000);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            ws.close();
        };
    }

    function updateDashboard(data) {
        // --- Eye Status ---
        if (data.eye_status !== undefined) {
            valEyeStatus.textContent = data.eye_status.toUpperCase();
            
            if (data.eye_status.toLowerCase() === 'open') {
                eyeIconBg.className = 'card-icon green-gradient';
                valEyeStatus.style.color = 'white';
            } else {
                eyeIconBg.className = 'card-icon red-gradient';
                valEyeStatus.style.color = 'var(--accent-red)';
            }
        }

        // --- Head Tilt Angle ---
        if (data.head_tilt_angle !== undefined) {
            const angle = parseFloat(data.head_tilt_angle).toFixed(1);
            valHeadTilt.textContent = angle;
            
            // Map angle to a visualizer (-90 to +90 mapped to the bar)
            // If angle is 0, it's center. 
            // If positive, fill right. If negative, fill left.
            const maxAngle = 45; // clamp visualizer at 45 degrees
            let clampedAngle = Math.max(-maxAngle, Math.min(maxAngle, angle));
            
            if (clampedAngle >= 0) {
                // Lean Right
                const percent = (clampedAngle / maxAngle) * 50;
                tiltVisualizer.style.left = '50%';
                tiltVisualizer.style.width = `${percent}%`;
            } else {
                // Lean Left
                const percent = (Math.abs(clampedAngle) / maxAngle) * 50;
                tiltVisualizer.style.left = `${50 - percent}%`;
                tiltVisualizer.style.width = `${percent}%`;
            }
        }

        // --- Seat Pressure ---
        if (data.simulated_seat_pressure !== undefined) {
            const pressure = parseFloat(data.simulated_seat_pressure).toFixed(0);
            valSeatPressure.textContent = pressure;
            pressureVisualizer.style.width = `${pressure}%`;
        }
    }

    // Initial connection
    connect();
});
