import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import RateComparisonModal from '../components/RateComparisonModal';

const HomePage = () => {
  const [isRateComparisonOpen, setIsRateComparisonOpen] = useState(false);

  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      
      <RateComparisonModal 
        isOpen={isRateComparisonOpen}
        onClose={() => setIsRateComparisonOpen(false)}
      />
    </div>
  );
};

export default HomePage;
