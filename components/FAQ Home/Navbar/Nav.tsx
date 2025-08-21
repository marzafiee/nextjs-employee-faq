import React from 'react'

const Nav = () => {
  return (
    <div className="transition-all duration-200 h-[12vh] z-[100] fixed w-full"> {/*nav bar div*/}
        <div className="flex items-center justify-start w-full mx-auto bg-[#D0FF57] shadow-md"> {/*flexbox for navbar */}
            {/* defining a div for the flex containers for various elements in the navbar but since I only have the logo here, I only created one container to the far left*/}
            
            {/* LOGO */}
            <div className="flex items-center justify-start px-4 py-2">
                <img
                    src="/images/turntabl_Logo.png"
                    alt="Turntabl Logo"
                    className="h-6 w-auto max-h-[48px]"
                />
            </div>
        </div>
    </div>
  );
};

export default Nav;