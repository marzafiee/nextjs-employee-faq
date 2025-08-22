// here, we have all the FAQ page components like the Hero section, the grid section, etc
import React from 'react';
import Hero from "./Hero/Hero";
import FilterSlider from './Filter Slider/FilterSlider';

const FAQ = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <div className='px-4 py-6'>
        <FilterSlider />
      </div>
    </div>
  );
};

export default FAQ;