import React from 'react';
import Navbar from '../components/shared/Navbar';
import Hero from '../components/home/Hero';
import FeaturedHotels from '../components/home/FeaturedHotels';
import PopularExperiences from '../components/home/PopularExperiences';
import PopularDestinations from '../components/home/PopularDestinations';
import HowItWorks from '../components/home/HowItWorks';
import CTA from '../components/home/CTA';
import Footer from '../components/shared/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <main style={{ paddingTop: '80px' }}>
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