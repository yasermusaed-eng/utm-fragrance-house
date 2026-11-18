import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DropCountdown } from './components/DropCountdown';
import { FragranceList } from './components/FragranceList';
import { PricingSection } from './components/PricingSection';
import { CompoundingCraft } from './components/CompoundingCraft';
import { PickupStations } from './components/PickupStations';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';

export const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedFragranceId, setSelectedFragranceId] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml' | '100ml' | undefined>(undefined);

  const handleOpenOrder = (size?: '30ml' | '50ml' | '100ml') => {
    if (size) setSelectedSize(size);
    setIsOrderModalOpen(true);
  };

  const handleSelectFragrance = (fragranceId: string) => {
    setSelectedFragranceId(fragranceId);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0e0205] text-[#f5ede4] font-sans relative selection:bg-[#d4af37]/30 selection:text-[#f6e3b4]">
      {/* Sticky Navigation */}
      <Navbar onOpenOrder={() => handleOpenOrder()} />

      {/* Main Content */}
      <main>
        <Hero onOpenOrder={() => handleOpenOrder()} />
        <DropCountdown />
        <FragranceList onSelectForOrder={handleSelectFragrance} />
        <PricingSection onOpenOrder={handleOpenOrder} />
        <CompoundingCraft />
        <PickupStations />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive WhatsApp Order Creator Modal */}
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        preselectedFragranceId={selectedFragranceId}
        preselectedSize={selectedSize}
      />
    </div>
  );
};

export default App;
