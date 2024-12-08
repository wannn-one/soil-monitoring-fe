import React from 'react';

import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

import Hero from '../components/Hero';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
