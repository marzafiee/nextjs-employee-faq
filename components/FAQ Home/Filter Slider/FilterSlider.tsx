import React, { useState } from 'react';

const FilterSlider = () => {
    // initially, as shown in the Figma, we have 'All' set as the default selected filter
    const [activeFilter, setActiveFilter] = useState('All')
    
    // but in the meantime, these are all the buttons we would have in the slider
    const filters = [
        'All',
        'Basic Requirements',
        'Common Scenarios',
        'Potential Issues'
    ]
    
    return (
        <div className='flex justify-center w-full'>
            <div className='flex gap-2 sm:gap-[10px] p-2 sm:p-4 bg-[var(--bg-secondary)] rounded-lg overflow-x-auto max-w-fit'>
            {/*Now we loop through EACH filter option with the map function and create a button for each filter in our array */}
            {filters.map((filter) => (
                <button
                    key={filter}
                    // when the button is clicked, we'd update the active filter's state so:
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 sm:px-8 md:px-16 lg:px-[100px] py-2 rounded-[45px] font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                        // if this button is the active one, apply the active styling
                        activeFilter === filter
                            ? 'text-[var(--btn-text-active)]'
                            // and if not active, apply default styling
                            : 'text-[var(--btn-text-default)] hover:opacity-80'
                    }`}
                    //now we have inline styles using CSS custom properties
                    style={{
                        // Default state styling using CSS variables
                        backgroundColor: activeFilter === filter 
                            ? 'var(--btn-bg-active)' 
                            : 'rgba(236, 255, 183, 0.65)', // Using your --btn-fill-default with opacity
                        border: '1px solid var(--btn-border-default)',
                        borderColor: activeFilter === filter 
                            ? 'var(--btn-bg-active)' 
                            : 'rgba(189, 255, 0, 0.5)', // Using your --btn-border-default with opacity
                        boxSizing: 'border-box', // ensures border is positioned inside
                    }}
                > 
                    {/* display the name of the filter as button text */}
                    {filter}
                </button>
            ))}
        </div>
        </div>
    );
};

export default FilterSlider;