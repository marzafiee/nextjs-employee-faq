"use client"
import React, { useState, useEffect } from 'react';

interface FilterSliderProps {
    activeFilter?: string;
    onFilterChange?: (filter: string) => void;
}

const FilterSlider: React.FC<FilterSliderProps> = ({ 
    activeFilter: externalActiveFilter, 
    onFilterChange 
}) => {
    // Use internal state if no external state is provided
    const [internalActiveFilter, setInternalActiveFilter] = useState('All');
    
    // Determine which state to use
    const activeFilter = externalActiveFilter !== undefined ? externalActiveFilter : internalActiveFilter;
    const handleFilterChange = onFilterChange || setInternalActiveFilter;
    
    // state for responsive positioning (client-side only)
    const [topPosition, setTopPosition] = useState('-60px') // safe default for mobile
    
    // but in the meantime, these are all the buttons we would have in the slider
    const filters = [
        'All',
        'Basic Requirements',
        'Common Scenarios',
        'Potential Issues'
    ]

    // function to handle dynamic button styles based on active state
    const getButtonStyles = (isActive: boolean) => ({
        backgroundColor: isActive ? 'var(--btn-bg-active)' : 'var(--btn-fill-default)',
        color: isActive ? 'var(--btn-text-active)' : 'var(--btn-text-default)'
    })

    // function to get responsive border classes
    const getBorderClasses = (isActive: boolean) => {
        const borderColor = isActive ? 'border-[var(--btn-bg-active)]' : 'border-[var(--btn-border-default)]'
        return `border md:border-3 ${borderColor}`
    }

    // function to get responsive positioning (client-side only)
    const getResponsivePosition = () => {
        if (typeof window === 'undefined') return '-60px';
        if (window.innerWidth >= 1024) return '-200px' // large screens
        if (window.innerWidth >= 768) return '-120px'  // medium screens
        return '-60px' // small screens
    }

    // useEffect to set positioning after component mounts (client-side only)
    useEffect(() => {
        const updatePosition = () => {
            setTopPosition(getResponsivePosition())
        }

        // Set initial position
        updatePosition()

        // update position on window resize
        window.addEventListener('resize', updatePosition)
        return () => window.removeEventListener('resize', updatePosition)
    }, [])
    
    return (
        <div className='flex justify-center w-full px-2 relative pb-[0]' style={{ top: topPosition }}>
            <div className='flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 p-2 sm:p-3 md:p-4 rounded-lg max-w-full'>
                {/*Now we loop through EACH filter option with the map function and create a button for each filter in our array */}
                {filters.map((filter) => (
                    <button
                        key={filter}
                        // when the button is clicked, we'd update the active filter's state so:
                        onClick={() => handleFilterChange(filter)}
                        className={`px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-200 whitespace-nowrap text-xs sm:text-sm md:text-base leading-tight flex-shrink-0 min-w-0 ${getBorderClasses(activeFilter === filter)}`}
                        // use the dynamic styling function
                        style={getButtonStyles(activeFilter === filter)}
                    > 
                        {/* display the name of the filter as button text */}
                        <span className="block truncate max-w-full">
                            {filter}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterSlider;