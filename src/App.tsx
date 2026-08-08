import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { Section01Problem } from './components/Section01Problem';
import { Section02System } from './components/Section02System';
import { Section03Vision } from './components/Section03Vision';
import { Section04Pressure } from './components/Section04Pressure';
import { Section05Fusion } from './components/Section05Fusion';
import { Section06TheMoment } from './components/Section06TheMoment';
import { Section07DashboardPreview } from './components/Section07DashboardPreview';
import { Section08Hardware } from './components/Section08Hardware';
import { Section09WhyDriveAware } from './components/Section09WhyDriveAware';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';
import { DashboardView } from './pages/DashboardView';
import { MovingVehicleBackground } from './components/MovingVehicleBackground';
import { useTelemetryData } from './hooks/useTelemetryData';
import { useLenisScroll } from './hooks/useLenisScroll';

export function App() {
  // Starting initialization step removed as requested
  const [currentView, setCurrentView] = useState<'brand' | 'dashboard'>('brand');

  const { telemetry, isConnected, isSimulated, triggerScenario, activeScenario } = useTelemetryData();
  const { scrollProgress, scrollVelocity } = useLenisScroll();

  const handleExplore = () => {
    const el = document.getElementById('problem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTech = () => {
    const el = document.getElementById('system');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F4F5F7] selection:bg-[#DFFF00] selection:text-black relative overflow-x-hidden">
      {/* Technical Reticle Cursor */}
      <CustomCursor />

      {/* Dynamic 3D Heavy Transport Cyber Truck Highway Background responding instantly to Scroll */}
      {currentView === 'brand' && (
        <MovingVehicleBackground scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />
      )}

      {/* Main View Router */}
      {currentView === 'dashboard' ? (
        <DashboardView
          telemetry={telemetry}
          isConnected={isConnected}
          isSimulated={isSimulated}
          triggerScenario={triggerScenario}
          activeScenario={activeScenario}
          onBack={() => setCurrentView('brand')}
        />
      ) : (
        <main className="relative z-10">
          {/* Floating Header Navigation */}
          <Navigation
            onOpenDashboard={() => setCurrentView('dashboard')}
            isConnected={isConnected}
          />

          {/* Hero Section with Interactive Letter Physics Title */}
          <HeroSection onExplore={handleExplore} />

          {/* Section 01 — Problem Definition */}
          <Section01Problem />

          {/* Section 02 — Architecture Pipeline */}
          <Section02System />

          {/* Section 03 — Computer Vision */}
          <Section03Vision />

          {/* Section 04 — Seat Pressure Sensing */}
          <Section04Pressure />

          {/* Section 05 — Sensor Fusion Engine */}
          <Section05Fusion />

          {/* Section 06 — The Moment */}
          <Section06TheMoment />

          {/* Section 07 — Dashboard Preview */}
          <Section07DashboardPreview
            telemetry={telemetry}
            onOpenFullDashboard={() => setCurrentView('dashboard')}
          />

          {/* Section 08 — Hardware Architecture */}
          <Section08Hardware />

          {/* Section 09 — Why DriveAware */}
          <Section09WhyDriveAware />

          {/* Final Brand Section & Footer */}
          <FinalSection
            onOpenDashboard={() => setCurrentView('dashboard')}
            onExploreTech={handleExploreTech}
          />

          <Footer onOpenDashboard={() => setCurrentView('dashboard')} />
        </main>
      )}
    </div>
  );
}

export default App;
