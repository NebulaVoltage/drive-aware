import { useState, useEffect, useCallback, useRef } from 'react';

export interface TelemetryFrame {
  timestamp: string;
  eyeStatus: 'OPEN' | 'CLOSED' | 'DROWSY';
  headTiltAngle: number;
  seatPressureLeft: number;
  seatPressureRight: number;
  overallPressure: number;
  driverState: 'NORMAL' | 'DROWSY' | 'POOR POSTURE' | 'FATIGUE RISK' | 'CRITICAL ALERT';
  visionConfidence: number;
  postureStability: number;
  fatigueIndex: number; // 0 - 100
  keypoints: { x: number; y: number; confidence: number; label: string }[];
  alertLevel: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export function useTelemetryData() {
  const [telemetry, setTelemetry] = useState<TelemetryFrame>({
    timestamp: new Date().toLocaleTimeString(),
    eyeStatus: 'OPEN',
    headTiltAngle: 1.2,
    seatPressureLeft: 52.4,
    seatPressureRight: 49.8,
    overallPressure: 51.1,
    driverState: 'NORMAL',
    visionConfidence: 98.4,
    postureStability: 94.2,
    fatigueIndex: 12.5,
    keypoints: [
      { x: 0.48, y: 0.32, confidence: 0.98, label: 'Nose' },
      { x: 0.45, y: 0.30, confidence: 0.95, label: 'Left Eye' },
      { x: 0.51, y: 0.30, confidence: 0.96, label: 'Right Eye' },
      { x: 0.42, y: 0.45, confidence: 0.92, label: 'Left Shoulder' },
      { x: 0.54, y: 0.45, confidence: 0.93, label: 'Right Shoulder' },
    ],
    alertLevel: 'NORMAL'
  });

  const [isConnected, setIsConnected] = useState(false);
  const [isSimulated, setIsSimulated] = useState(true);
  const activeScenarioRef = useRef<'NONE' | 'FATIGUE' | 'POSTURE' | 'DROWSY'>('NONE');

  // Simulated live data generator when WS backend isn't present
  useEffect(() => {
    if (!isSimulated) return;

    let phase = 0;
    const interval = setInterval(() => {
      phase += 0.1;
      const scenario = activeScenarioRef.current;

      setTelemetry(prev => {
        let eye: 'OPEN' | 'CLOSED' | 'DROWSY' = 'OPEN';
        let tilt = Math.sin(phase) * 3;
        let leftP = 50 + Math.sin(phase * 0.5) * 4;
        let rightP = 50 - Math.sin(phase * 0.5) * 4;
        let fatigue = 10 + Math.abs(Math.sin(phase * 0.2)) * 15;
        let state: TelemetryFrame['driverState'] = 'NORMAL';
        let alert: TelemetryFrame['alertLevel'] = 'NORMAL';

        if (scenario === 'FATIGUE' || scenario === 'DROWSY') {
          eye = Math.random() < 0.4 ? 'CLOSED' : 'DROWSY';
          tilt = -18 + Math.random() * 8;
          leftP = 22;
          rightP = 78;
          fatigue = 88.5 + Math.random() * 8;
          state = 'FATIGUE RISK';
          alert = 'CRITICAL';
        } else if (scenario === 'POSTURE') {
          eye = 'OPEN';
          tilt = 14 + Math.random() * 5;
          leftP = 18;
          rightP = 82;
          fatigue = 45;
          state = 'POOR POSTURE';
          alert = 'WARNING';
        } else {
          // Normal random fluctuation
          if (Math.random() < 0.08) {
            eye = 'DROWSY';
          }
        }

        return {
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + Math.floor(Math.random()*900 + 100),
          eyeStatus: eye,
          headTiltAngle: Number(tilt.toFixed(1)),
          seatPressureLeft: Number(leftP.toFixed(1)),
          seatPressureRight: Number(rightP.toFixed(1)),
          overallPressure: Number(((leftP + rightP) / 2).toFixed(1)),
          driverState: state,
          visionConfidence: Number((97.5 + Math.random() * 1.5).toFixed(1)),
          postureStability: Number((100 - Math.abs(leftP - rightP)).toFixed(1)),
          fatigueIndex: Number(fatigue.toFixed(1)),
          keypoints: [
            { x: 0.48 + Math.sin(phase)*0.01, y: 0.32, confidence: 0.98, label: 'Nose' },
            { x: 0.45 + Math.sin(phase)*0.01, y: 0.30, confidence: 0.95, label: 'Left Eye' },
            { x: 0.51 + Math.sin(phase)*0.01, y: 0.30, confidence: 0.96, label: 'Right Eye' },
            { x: 0.42 + (leftP > 60 ? 0.04 : 0), y: 0.45, confidence: 0.92, label: 'Left Shoulder' },
            { x: 0.54 + (rightP > 60 ? 0.04 : 0), y: 0.45, confidence: 0.93, label: 'Right Shoulder' },
          ],
          alertLevel: alert
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isSimulated]);

  // Attempt real WebSocket connection to python server
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: any = null;

    const connectWS = () => {
      try {
        ws = new WebSocket('ws://localhost:8765');
        ws.onopen = () => {
          setIsConnected(true);
          setIsSimulated(false);
          console.log('[DRIVEAWARE TELEMETRY] Live WebSocket connected to backend');
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setTelemetry(prev => ({
              ...prev,
              timestamp: new Date().toLocaleTimeString(),
              eyeStatus: data.eye_status ? data.eye_status.toUpperCase() : prev.eyeStatus,
              headTiltAngle: data.head_tilt_angle !== undefined ? parseFloat(data.head_tilt_angle) : prev.headTiltAngle,
              overallPressure: data.simulated_seat_pressure !== undefined ? parseFloat(data.simulated_seat_pressure) : prev.overallPressure,
              seatPressureLeft: data.simulated_seat_pressure ? parseFloat(data.simulated_seat_pressure) * 0.9 : prev.seatPressureLeft,
              seatPressureRight: data.simulated_seat_pressure ? parseFloat(data.simulated_seat_pressure) * 1.1 : prev.seatPressureRight,
              driverState: (data.eye_status === 'closed' || data.simulated_seat_pressure > 85) ? 'FATIGUE RISK' : 'NORMAL'
            }));
          } catch (e) {
            console.error('Error parsing telemetry frame:', e);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          // Fall back to simulation if real websocket disconnects
          setIsSimulated(true);
          reconnectTimeout = setTimeout(connectWS, 4000);
        };

        ws.onerror = () => {
          ws?.close();
        };
      } catch (err) {
        setIsSimulated(true);
      }
    };

    connectWS();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  const triggerScenario = useCallback((scenarioName: 'NONE' | 'FATIGUE' | 'POSTURE' | 'DROWSY') => {
    activeScenarioRef.current = scenarioName;
  }, []);

  return {
    telemetry,
    isConnected,
    isSimulated,
    triggerScenario,
    activeScenario: activeScenarioRef.current
  };
}
