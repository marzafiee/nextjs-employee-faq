// here, we have all the FAQ page components like the Hero section, the grid section, etc
import React from 'react';
import Hero from "./Hero/Hero";
import FilterSlider from './Filter Slider/FilterSlider';

const FAQ = () => {
  return (
    <div className="overflow-hidden">
      <div>
        <Hero />
      </div>
      <div className='px-0' style={{marginTop: '0px'}}>
        <FilterSlider />
      </div>
    </div>
  );
};

export default FAQ;