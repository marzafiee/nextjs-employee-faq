import React from 'react'

const Nav = () => {
  return (
    <div className="transition-all duration-200 h-[12vh] z-[100] fixed w-full"> {/*nav bar div*/}
        <div className="flex items-center h-full justify start w-full mx-auto bg-[#D0FF57]"> {/*flexbox for navbar */}
            {/* defining a div for the flex containers for various elements in the navbar but since I only have the logo here, I only created one container to the far left*/}
            
            {/* LOGO */}
            <div className="flex items-center">
                <img
                    src="/images/turntabl_Logo.png"
                    alt="Turntabl Logo"
                    className="h-7 w-auto"
                />
            </div>
        </div>
    </div>
  );
};

export default Nav;