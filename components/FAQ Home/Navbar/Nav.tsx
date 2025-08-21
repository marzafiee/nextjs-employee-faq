import React from 'react'
import { HiMenuAlt4 } from 'react-icons/hi';

const Nav = () => {
  return (
    <div className="transition-all duration-200 h-[12vh] z-[100] fixed w-full"> {/*nav bar div*/}
        <div className="flex w-full mx-auto bg-[#D0FF57] shadow-md sm:px-6 md:px-8"> {/*flexbox for navbar */}
            {/* defining a div for the flex containers for various elements in the navbar but since I only have the logo here, I only created one container to the far left*/}
            
            {/* LOGO */}
          <div className="flex items-center w-full justify-start px-4 py-2">
            <img
              src="/images/turntabl_Logo.png"
              alt="Turntabl Logo"
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto max-h-12"
            />
          </div>
          <div className="flex justify-end pr-6">
            {/* burger menu*/}
            <HiMenuAlt4 className="w-5 h-10 auto cursor-pointer text-black lg:hidden" />
          </div>
        </div>
    </div>
  );
};

export default Nav;