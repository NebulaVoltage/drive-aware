import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, Cpu, Zap, Activity, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  sub: string;
  category: 'VISION' | 'HARDWARE' | 'INTELLIGENCE' | 'ACTION';
  icon: any;
  techDetail: string;
  latency: string;
  status: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'camera',
    name: 'CAMERA',
    sub: 'OPTICAL FEED',
    category: 'VISION',
    icon: Camera,
    techDetail: '1080p @ 60FPS NIR Infrared Optical Module with non-intrusive night vision.',
    latency: '1.2 ms',
    status: 'ACTIVE STREAM'
  },
  {
    id: 'yolo',
    name: 'YOLO',
    sub: 'VISUAL INTELLIGENCE',
    category: 'VISION',
    icon: Eye,
    techDetail: 'YOLOv8 Pose Model running on-device TensorRT / OpenVINO acceleration.',
    latency: '4.8 ms',
    status: '17 KEYPOINTS'
  },
  {
    id: 'pose',
    name: 'POSE / FACE',
    sub: 'LANDMARK TRACKER',
    category: 'VISION',
    icon: Activity,
    techDetail: 'Facial landmark vector calculation for Eye Aspect Ratio (EAR) & Head Pitch/Yaw.',
    latency: '2.1 ms',
    status: '68 LANDMARKS'
  },
  {
    id: 'arduino',
    name: 'ARDUINO',
    sub: 'PHYSICAL SENSING',
    category: 'HARDWARE',
    icon: Cpu,
    techDetail: 'High-speed microcontroller ADC hub parsing piezo matrix analog signals.',
    latency: '0.8 ms',
    status: '100 Hz SAMPLING'
  },
  {
    id: 'pressure',
    name: 'PRESSURE',
    sub: 'POSTURE SIGNAL',
    category: 'HARDWARE',
    icon: Zap,
    techDetail: 'Multi-zone seat grid tracking center-of-mass shift and pelvic slump.',
    latency: '1.5 ms',
    status: '16 SENSOR ZONES'
  },
  {
    id: 'fusion',
    name: 'SENSOR FUSION',
    sub: 'DECISION LAYER',
    category: 'INTELLIGENCE',
    icon: ShieldCheck,
    techDetail: 'Multi-modal Bayesian confidence matrix merging optical and physical vectors.',
    latency: '2.4 ms',
    status: 'FUSION CORE'
  },
  {
    id: 'alert',
    name: 'ALERT',
    sub: 'IMMEDIATE RESPONSE',
    category: 'ACTION',
    icon: AlertTriangle,
    techDetail: 'Dual haptic steering vibration and acoustic telemetry alert trigger.',
    latency: '< 0.5 ms',
    status: 'TRIGGER STANDBY'
  }
];

export function Section02System() {
  const [activeNodeId, setActiveNodeId] = useState<string>('fusion');
  const activeNode = SYSTEM_NODES.find(n => n.id === activeNodeId) || SYSTEM_NODES[5];

  return (
    <section id="system" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#090A0C] overflow-hidden">
      {/* Background Energy Particle Streams */}
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DFFF00]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 02</span>
            <span>// ARCHITECTURE OF VIGILANCE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse" />
            <span>INTERACTIVE SYSTEM NODES [HOVER TO INSPECT]</span>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            THE <span className="text-[#DFFF00]">DRIVEAWARE</span> ARCHITECTURE
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-sans mt-3">
            Optical computer vision and physical pressure sensing converge into a single high-frequency decision engine.
          </p>
        </motion.div>

        {/* Interactive System Flow Node Pipeline */}
        <div className="relative py-8">
          {/* Energy Beam Connection Path */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-[3px] bg-[#181C23] -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#DFFF00] via-emerald-400 to-[#DFFF00]"
              animate={{
                x: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ width: '25%' }}
            />
          </div>

          {/* System Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 relative z-10">
            {SYSTEM_NODES.map((node, index) => {
              const IconComp = node.icon;
              const isActive = node.id === activeNodeId;

              return (
                <motion.div
                  key={node.id}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  onClick={() => setActiveNodeId(node.id)}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  data-cursor="hover"
                  className={`p-4 rounded border transition-all cursor-pointer flex flex-col justify-between min-h-[190px] hud-corner ${
                    isActive
                      ? 'bg-[#111419] border-[#DFFF00] box-glow-lime'
                      : 'bg-[#0E1013]/90 border-[#232934] hover:border-[#DFFF00]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech mb-3">
                      <span className={isActive ? 'text-[#DFFF00]' : 'text-gray-500'}>0{index + 1}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#181C23] text-gray-400 font-mono-tech text-[8px]">
                        {node.category}
                      </span>
                    </div>

                    <div className={`p-2.5 rounded-lg w-fit mb-3 ${isActive ? 'bg-[#DFFF00] text-black' : 'bg-[#181C23] text-gray-300'}`}>
                      <IconComp size={20} />
                    </div>

                    <h3 className="text-sm font-extrabold font-display uppercase tracking-wider text-white">
                      {node.name}
                    </h3>
                    <p className="text-[10px] font-mono-tech text-[#DFFF00] tracking-tight mt-0.5">
                      {node.sub}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#181C23] flex items-center justify-between text-[9px] font-mono-tech text-gray-500">
                    <span>LATENCY</span>
                    <span className={isActive ? 'text-[#DFFF00] font-bold' : 'text-gray-400'}>{node.latency}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Active Node Inspector Card */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 p-6 md:p-8 bg-[#111419] border border-[#DFFF00]/40 rounded hud-corner backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00]">
              <span>NODE INSPECTOR</span>
              <span>// {activeNode.category} COMPONENT</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold font-display uppercase text-white">
              {activeNode.name} — <span className="text-[#DFFF00]">{activeNode.sub}</span>
            </h3>
            <p className="text-gray-300 text-base font-sans leading-relaxed">
              {activeNode.techDetail}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3 p-4 bg-[#090A0C] border border-[#232934] font-mono-tech text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">SYSTEM LATENCY:</span>
              <span className="text-[#DFFF00] font-bold">{activeNode.latency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">REALTIME STATE:</span>
              <span className="text-emerald-400 font-bold">{activeNode.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">FUSION CONFIDENCE:</span>
              <span className="text-white font-bold">99.4% VERIFIED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
