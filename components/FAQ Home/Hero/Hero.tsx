import React from 'react';

const Hero = () => {
  return (
  <div
    className="relative w-full h-[60vh] sm:h-screen flex flex-col justify-center items-center text-center px-4 
              mt-[40px] lg:mt-[-35px]"
    style={{
      backgroundImage: `linear-gradient(
        to bottom, 
        rgba(189, 255, 0, 0.62) 0%, 
        rgba(122, 150, 3, 0.8) 30%, 
        rgba(26, 26, 26, 1) 85%
      )`,
      marginBottom: '0px',
    }}
    >
      <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-6 max-w-4xl">
        &lt;/Frequently Asked Questions (FAQ)_ 
      </h1>
      <p className="text-gray-300 max-w-3xl leading-relaxed text-base sm:text-lg px-0">
        These are the most commonly asked questions about employee attendance.<br />
        Can’t find what you’re looking for?{' '}
        <a href="#" className="underline text-white hover:text-[#BDFF00]">
          Chat to our friendly team!
        </a>
      </p>
    </div>
  );
};

export default Hero;
