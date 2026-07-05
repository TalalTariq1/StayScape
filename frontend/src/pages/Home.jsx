import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedHotels from '../components/home/FeaturedHotels';
import PopularDestinations from '../components/home/PopularDestinations';
import HowItWorks from '../components/home/HowItWorks';
import CTA from '../components/home/CTA';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <main className="home-main">
        <Hero />
        <FeaturedHotels />
        <PopularDestinations />
        <HowItWorks />
        <CTA />
      </main>
    </div>
  );
};

export default Home;