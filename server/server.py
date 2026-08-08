import asyncio
import json
import random
import math
import cv2
import websockets
import threading
import time
from ultralytics import YOLO

# Shared telemetry dictionary (Thread-safe due to GIL for simple dict operations)
telemetry_data = {
    "eye_status": "open",
    "head_tilt_angle": 0.0,
    "simulated_seat_pressure": 50.0
}

# Control flag for shutting down all threads safely
running = True

def calculate_angle(p1, p2):
    """Calculate the angle between two points."""
    return math.degrees(math.atan2(p2[1] - p1[1], p2[0] - p1[0]))

class CameraStream:
    """Thread to continuously grab frames from the webcam to clear the buffer."""
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
        if not self.cap.isOpened():
            raise RuntimeError("Error: Could not open webcam.")
        
        # Read first frame
        self.ret, self.frame = self.cap.read()
        self.thread = threading.Thread(target=self.update, daemon=True)
        
    def start(self):
        self.thread.start()
        
    def update(self):
        global running
        while running:
            if self.cap.isOpened():
                # Grab the latest frame and discard old ones in the buffer
                self.ret, self.frame = self.cap.read()
            else:
                running = False
                
    def get_frame(self):
        return self.frame
        
    def release(self):
        self.cap.release()

class InferenceStream:
    """Thread to run YOLO inference on the latest frame from the CameraStream."""
    def __init__(self, camera_stream):
        self.camera = camera_stream
        print("Loading optimized YOLOv8 pose model...")
        import os
        model_file = os.path.join(os.path.dirname(__file__), 'yolov8n-pose.pt')
        if not os.path.exists(model_file):
            model_file = 'yolov8n-pose.pt'
        self.model = YOLO(model_file)
        self.thread = threading.Thread(target=self.run_inference, daemon=True)
        
    def start(self):
        self.thread.start()
        
    def run_inference(self):
        global running
        print("Inference loop started.")
        
        while running:
            frame = self.camera.get_frame()
            if frame is None:
                time.sleep(0.01)
                continue
                
            # Run YOLOv8 pose inference with optimizations
            # imgsz=320 reduces the resolution for faster processing
            # half=True could be added here if using a compatible GPU
            results = self.model(frame, stream=True, verbose=False, imgsz=320)
            
            for r in results:
                # Plot the skeleton on the frame for display
                display_frame = r.plot()
                
                # Extract keypoints
                if r.keypoints is not None and len(r.keypoints.xy) > 0:
                    keypoints = r.keypoints.xy[0].cpu().numpy()
                    
                    if len(keypoints) >= 7:
                        left_shoulder = keypoints[5]
                        right_shoulder = keypoints[6]
                        left_eye = keypoints[1]
                        right_eye = keypoints[2]
                        
                        # Process Head Tilt
                        if left_shoulder[0] != 0 and right_shoulder[0] != 0:
                            angle = calculate_angle(left_shoulder, right_shoulder)
                            telemetry_data["head_tilt_angle"] = round(angle, 2)
                        
                        # Process Eye Status (Placeholder logic)
                        if left_eye[0] != 0 and right_eye[0] != 0:
                            if random.random() < 0.05:
                                telemetry_data["eye_status"] = "closed"
                            else:
                                telemetry_data["eye_status"] = "open"
                                
            # Simulate Seat Pressure Updates
            telemetry_data["simulated_seat_pressure"] += random.uniform(-2, 2)
            telemetry_data["simulated_seat_pressure"] = max(0, min(100, telemetry_data["simulated_seat_pressure"]))
            telemetry_data["simulated_seat_pressure"] = round(telemetry_data["simulated_seat_pressure"], 2)

            # Show the output frame (cv2.imshow works well enough in this thread on Windows)
            cv2.imshow('Edge AI - Pose Tracking (Optimized)', display_frame)
            
            # Wait for 'q' to quit (also serves to pump the GUI event loop)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                running = False
                break
                
        cv2.destroyAllWindows()


async def websocket_handler(websocket):
    """Handler for WebSocket connections to stream telemetry data."""
    global running
    print(f"Client connected: {websocket.remote_address}")
    try:
        while running:
            # Broadcast the current telemetry data instantly
            payload = json.dumps(telemetry_data)
            await websocket.send(payload)
            # High-frequency update rate (20Hz)
            await asyncio.sleep(0.05)
    except websockets.exceptions.ConnectionClosed:
        print(f"Client disconnected: {websocket.remote_address}")
    except asyncio.CancelledError:
        pass

async def main():
    """Main asyncio loop for the WebSocket server."""
    global running
    print("Starting Edge AI Backend (Optimized Multithreaded)...")
    
    try:
        # 1. Start the Camera Grabber Thread
        cam_stream = CameraStream(src=0)
        cam_stream.start()
        
        # 2. Start the Inference Thread
        inference_stream = InferenceStream(cam_stream)
        inference_stream.start()
    except Exception as e:
        print(e)
        running = False
        return

    # 3. Start the WebSocket Server in the main async thread
    server = await websockets.serve(websocket_handler, "localhost", 8765)
    print("WebSocket server running on ws://localhost:8765")
    
    try:
        # Keep the main loop alive while the background threads run
        while running:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("\nKeyboardInterrupt received. Shutting down...")
    finally:
        running = False
        print("Cleaning up threads and resources...")
        cam_stream.release()
        server.close()
        await server.wait_closed()
        print("Backend shutdown complete.")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nProgram interrupted. Exiting.")
