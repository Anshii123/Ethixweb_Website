import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { CapabilitiesStrip } from '../components/home/CapabilitiesStrip';
import { RobustSolutionsIndia } from '../components/home/RobustSolutionsIndia';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { GlobalNetwork } from '../components/home/GlobalNetwork';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { FeaturedWork } from '../components/home/FeaturedWork';
import { WhyEthixweb } from '../components/home/WhyEthixweb';
import { CtaBanner } from '../components/home/CtaBanner';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Ethixweb | We Run the Tech. You Run the Business. Digital Operations & Web Applications';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CapabilitiesStrip />
      <RobustSolutionsIndia />
      <ServicesOverview />
      <GlobalNetwork />
      <TestimonialsSection />
      <ProcessSection />
      <FeaturedWork />
      <WhyEthixweb />
      <CtaBanner />
    </div>
  );
};
