"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import FilterSlider from './../filter-slider/FilterSlider';

// Interface for the FAQ cards' contents
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// Storing the actual questions and answers in an array
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How many days am I required to be in the office?",
    answer: "You are required to be in the office for a minimum of 3 days per week as per company policy.",
    category: "Basic Requirements"
  },
  {
    id: 2,
    question: "What is the 'Weekly Quota'?",
    answer: "It is simply a visual indicator that keeps track of how many full days (out of the minimum 3 days) you have been to the office for the current work week.",
    category: "Basic Requirements"
  },
  {
    id: 3,
    question: "What happens if I take a sick day or a holiday?",
    answer: "Sick days and holidays do not count against your office attendance quota. You will need to inform your manager and HR department about any planned absences.",
    category: "Common Scenarios"
  },
  {
    id: 4,
    question: "Will my streak break if I do not come to the office on my selected day but attend on a different day?",
    answer: "No, your streak will not break. However, your lead will be notified of your absence on the originally selected day.",
    category: "Common Scenarios"
  },
  {
    id: 5,
    question: "What happens if I forget to clock in using the logger?",
    answer: "If you do not clock in with the logger, your data source is solely reliant on the access control but in case the access control is offline, your data for that day might be inaccurate.",
    category: "Potential Issues"
  },
  {
    id: 6,
    question: "What happens if I spend more than 6 hours and 30 minutes in the office but arrive later than 10:00 AM?",
    answer: "No, your streak will not break but you will be flagged for not getting to the office on time.",
    category: "Potential Issues"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Basic Requirements":
      return "bg-[#E8FFA5] text-black";
    case "Common Scenarios":
      return "bg-white text-black";
    case "Potential Issues":
      return "bg-[#B0E519] text-black";
    default:
      return "bg-white text-black";
  }
};

// Function to shuffle array randomly because I didn't liked how they were already ordered according to category
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FAQComponent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [shuffledFAQs, setShuffledFAQs] = useState<FAQItem[]>([]);

  // Filter and shuffle FAQs --the logic
  useEffect(() => {
    const filtered = activeFilter === "All" 
      ? faqData 
      : faqData.filter(faq => faq.category === activeFilter);
    
    setShuffledFAQs(shuffleArray(filtered));
  }, [activeFilter]);

  const toggleExpanded = (id: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <div>
      {/* Use the imported FilterSlider component */}
      <FilterSlider 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      {/* Reduced spacing here - changed from pt-8 to pt-2 */}
      <div className="p-4 pt-2">
        <div className="max-w-6xl mx-auto">
          {/* FAQ Items - Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {shuffledFAQs.map((faq) => (
              // this is for the colour of the cards
              <div key={faq.id} 
              className="rounded-[30px] overflow-hidden shadow-lg" 
              style={{
                background: `linear-gradient(
                  to right,
                  rgba(189, 255, 0, 0.2) -170%,
                  rgba(49, 49, 49, 0.3) 70%
                )`
              }}>
                {/* Category Tag */}
                <div className="p-4 pb-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
                    {faq.category}
                  </span>
                </div>
                
                {/* Question - Updated font sizes: text-[13px] for mobile, sm:text-[14px] for small screens, md:text-[15px] for medium+ */}
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full text-left px-4 pb-4 transition-colors duration-200  hover:bg-black/10"
                >
                  <div className="flex justify-between items-start gap-y-3">
                    <h3 className="font-medium leading-tight pr-2 text-white text-[15px] sm:text-[16px] md:text-[17px]">
                      {faq.question}
                    </h3>
                    {/* styling for the toggle arrow */}
                    <div className="
                    flex-shrink-0 w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center shadow-[0_3px_6px_rgba(189,255,0,0.5)]">
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-4 h-4 text-black" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-black" />
                      )}
                    </div>
                  </div>
                </button>  
                {/* divider Line with linear gradient */}
                {expandedItems.has(faq.id) && (
                  <div className="px-4">
                    <div
                      className="h-px w-full opacity-80"
                      style={{
                        background: `linear-gradient(to right, #BDFF00 33%, rgba(255, 255, 255, 0.59) 100%)`
                      }}
                    />
                  </div>
                )}                
                {/* Answer */}
                {expandedItems.has(faq.id) && (
                  <div className="px-4 py-4 w-full">
                    <div className="text-[#E5E5E5] leading-relaxed w-full text-[13px] sm:text-[14px] md:text-[15px]">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Items - for the Desktop 2 column grid layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-3">
            {shuffledFAQs.map((faq) => (
              <div key={faq.id} className='rounded-[30px] overflow-hidden h-fit'
              style={{
                background: `linear-gradient(
                  to right,
                  rgba(189, 255, 0, 0.2) -170%,
                  rgba(49, 49, 49, 0.3) 70%
                )`
              }}>
                {/* Category Tag */}
                <div className="p-4 pb-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
                    {faq.category}
                  </span>
                </div>
                
                {/* Question*/}
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full text-left px-4 pb-4 hover:bg-black/10 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-medium leading-tight pr-2 text-white text-[16px] xl:text-[18px]">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center shadow-[0_3px_6px_rgba(189,255,0,0.5)]">
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-4 h-4 text-black" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-black" />
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Divider Line with gradient */}
                {expandedItems.has(faq.id) && (
                  <div className="px-4">
                    <div className="h-px bg-gradient-to-r from-[#BDFF00] via-[#BDFF00] to-[#59FF00] w-full"></div>
                  </div>
                )}
                
                {/* Answer - for the desktop */}
                {expandedItems.has(faq.id) && (
                  <div className="px-4 py-4 w-full">
                    <div className="text-[#E5E5E5] leading-relaxed w-full text-[14px] xl:text-[19px]">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {shuffledFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No FAQ items found for the selected category.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;