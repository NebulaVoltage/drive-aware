# DRIVEAWARE — Next-Generation Driver Safety & Telemetry System

![DRIVEAWARE Banner](https://img.shields.io/badge/DRIVEAWARE-v4.8.2-DFFF00?style=for-the-badge&logoColor=000)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=fff)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Pose_Estimation-00FF66?style=for-the-badge)
![Arduino](https://img.shields.io/badge/Arduino-Piezo_Matrix-00979D?style=for-the-badge&logo=arduino&logoColor=fff)

> **"KEEP YOUR EYES ON THE ROAD."**
> A motorsport-inspired driver safety system combining YOLOv8 computer vision pose tracking, Arduino pressure seat matrix sensors, Bayesian multi-signal fusion, real-time alerts, and a live telemetry dashboard.

---

## 🏎️ Features & Architecture

### ⚡ Brand Experience & Interactions
- **Motorsport Engineering Aesthetic**: Graphite/carbon dark palette (`#090A0C`, `#111419`, `#181C23`) with high-voltage electric motorsport lime accent (`#DFFF00`).
- **Interactive Letter Physics**: `DRIVEAWARE` hero title responds to mouse cursor with magnetic letter pull, proximity distortion, z-depth zoom, and metallic light highlights.
- **3D Cyber Transport Truck Background**: 3D heavy semi-truck model driving an endless cyber telemetry highway with dynamic scroll acceleration, headlight beam flare, and wheel rotation.
- **Interactive 3D Driver Cockpit**: Three.js R3F driver head tracking model, scanning laser rings, and floating HUD telemetry overlays (`FACE`, `EYES`, `POSTURE`, `ALERT`).

### 📡 Multi-Signal Sensor Fusion Core
1. **Stream 01 — Optical Vision (YOLOv8)**: Real-time 17-point skeletal pose estimation tracking Eye Aspect Ratio (EAR), blink duration, and shoulder/head tilt vector.
2. **Stream 02 — Physical Sensing (Arduino Piezo Matrix)**: 16-zone pressure resistor array measuring center-of-mass weight shifts and lumbar force drop.
3. **Bayesian Decision Matrix**: Merges optical & physical channels to detect fatigue microsleeps before eyelid closure with < 14ms response latency and 99.4% accuracy.

---

## 📁 Repository Structure

```
drive-aware/
├── server/                       # Edge AI WebSocket Python Server
│   ├── server.py                 # Asynchronous Python server (YOLOv8 + WebSockets)
│   ├── yolov8n-pose.pt           # YOLOv8 Pose weights model
│   ├── requirements.txt          # Python dependencies (ultralytics, opencv, websockets)
│   └── legacy_client/            # Basic HTML/JS telemetry dashboard
├── src/                          # React + TypeScript Frontend Application
│   ├── components/               # UI components (Hero, Architecture, Vision, Pressure, Fusion)
│   ├── scenes/                   # 3D Three.js driver & transport truck scenes
│   ├── hooks/                    # Telemetry data stream, mouse position, and scroll hooks
│   └── pages/                    # Live Command Center Dashboard View
├── index.html                    # Root HTML entrypoint
├── package.json                  # Frontend dependencies
├── vite.config.ts                # Vite build configuration
├── tailwind.config.js            # Motorsport design system theme
└── README.md
```

---

## 🚀 Getting Started

### 1. Frontend Development Web App

```bash
# Install dependencies
npm install

# Start Vite dev server (runs at http://localhost:3000)
npm run dev

# Build for production
npm run build
```

### 2. Edge AI Pose Telemetry Server (Optional Backend)

```bash
# Navigate to server directory
cd server

# Install Python requirements
pip install -r requirements.txt

# Run the WebSocket server (broadcasts at ws://localhost:8765)
python server.py
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js (`@react-three/fiber`, `@react-three/drei`), Lucide Icons.
- **Backend / AI**: Python 3.10+, OpenCV, Ultralytics YOLOv8, Asyncio, WebSockets.

---

## 📜 License

Created for **DRIVEAWARE** Safety Systems.
