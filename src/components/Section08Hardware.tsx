import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Camera, Zap, Volume2, HardDrive, Check } from 'lucide-react';

export function Section08Hardware() {
  const [selectedHardware, setSelectedHardware] = useState<number>(0);

  const hardwareItems = [
    {
      id: 'mcu',
      name: 'ARDUINO MCU HUB',
      type: 'PROCESSING & ADC',
      icon: Cpu,
      specs: [
        'High-speed 16MHz Microcontroller core',
        '8-channel 10-bit analog-to-digital converter',
        'Hardware serial WebSocket baud rate stream (115200 bps)',
        'Low power active consumption (< 0.5W)'
      ],
      desc: 'Parses analog voltage readings from seat piezo matrix sensors and serializes JSON payload to AI engine.'
    },
    {
      id: 'cam',
      name: 'NIR OPTICAL CAMERA MODULE',
      type: 'VISION SENSOR',
      icon: Camera,
      specs: [
        '1080p Full HD sensor @ 60 FPS',
        'Built-in 850nm Near-Infrared LED ring for zero-light night vision',
        'Wide 120° distortion-free optical lens',
        'Hardware exposure lock'
      ],
      desc: 'Captures continuous driver facial & upper body video feed without blinding driver eyes at night.'
    },
    {
      id: 'seat',
      name: 'PIEZOELECTRIC SEAT MATRIX',
      type: 'PHYSICAL SENSORS',
      icon: Zap,
      specs: [
        '16-zone pressure resistor (FSR) array',
        '0.1N to 100N dynamic load sensitivity',
        'Automotive-grade flexible substrate',
        'Temperature compensated range (-40°C to +85°C)'
      ],
      desc: 'Embedded inside seat lumbar & thigh cushions to measure spatial center-of-mass weight shifts.'
    },
    {
      id: 'haptic',
      name: 'HAPTIC & ACOUSTIC TRANSDUCER',
      type: 'ALERT INTERVENTION',
      icon: Volume2,
      specs: [
        'Dual eccentric rotating mass (ERM) motors in seat & wheel',
        'High-decibel multi-tone piezoceramic alert buzzer',
        '< 5ms alert trigger response latency',
        'Customizable intensity pulse patterns'
      ],
      desc: 'Instantly alerts driver upon fatigue classification via tactile vibration and sound.'
    }
  ];

  return (
    <section id="hardware" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#060709] border-t border-b border-[#181C23] overflow-hidden">
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-10">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 08</span>
            <span>// PHYSICAL HARDWARE ARCHITECTURE</span>
          </div>
          <div className="text-xs font-mono-tech text-gray-400">
            ENGINEERED PRODUCT SPECIFICATIONS
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            HARDWARE <span className="text-[#DFFF00]">INTEGRATION</span>
          </h2>
          <p className="text-gray-400 text-base font-sans mt-2">
            Exploded view of the physical components powering DriveAware's multi-sensor safety stack.
          </p>
        </motion.div>

        {/* Exploded View Product Reveal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 4 Interactive Exploded Assembly Pieces */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {hardwareItems.map((item, idx) => {
              const IconComponent = item.icon;
              const isSelected = idx === selectedHardware;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedHardware(idx)}
                  whileHover={{ scale: 1.03, y: -4 }}
                  data-cursor="hover"
                  className={`p-6 rounded border transition-all cursor-pointer hud-corner flex flex-col justify-between min-h-[220px] ${
                    isSelected
                      ? 'bg-[#111419] border-[#DFFF00] box-glow-lime'
                      : 'bg-[#0E1013] border-[#232934] hover:border-[#DFFF00]/40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono-tech mb-3">
                      <span className={isSelected ? 'text-[#DFFF00]' : 'text-gray-500'}>COMP // 0{idx + 1}</span>
                      <span className="text-gray-500">{item.type}</span>
                    </div>

                    <div className={`p-3 rounded-lg w-fit mb-3 ${isSelected ? 'bg-[#DFFF00] text-black' : 'bg-[#181C23] text-gray-300'}`}>
                      <IconComponent size={24} />
                    </div>

                    <h3 className="text-base font-extrabold font-display uppercase tracking-wider text-white">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#181C23] flex items-center justify-between text-[10px] font-mono-tech">
                    <span className={isSelected ? 'text-[#DFFF00] font-bold' : 'text-gray-500'}>
                      {isSelected ? '[ SELECTED ]' : 'SELECT TO INSPECT'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Deep Technical Inspector Panel */}
          <div className="lg:col-span-6 bg-[#0E1013] border border-[#232934] p-8 rounded hud-corner space-y-6">
            <div className="flex items-center justify-between border-b border-[#181C23] pb-4 font-mono-tech text-xs">
              <span className="text-[#DFFF00] font-bold">COMPONENT SPECIFICATION</span>
              <span className="text-gray-500">ID: {hardwareItems[selectedHardware].id.toUpperCase()}</span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold font-display uppercase text-white mb-2">
                {hardwareItems[selectedHardware].name}
              </h3>
              <p className="text-gray-300 text-sm font-sans leading-relaxed">
                {hardwareItems[selectedHardware].desc}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#181C23]">
              <span className="text-xs font-mono-tech text-[#DFFF00] block uppercase">ENGINEERING HIGHLIGHTS:</span>
              <div className="space-y-2 font-mono-tech text-xs text-gray-300">
                {hardwareItems[selectedHardware].specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-[#DFFF00] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
