"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // these are for the up and down toggle arrows per card

// an interface for the cards' contents
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// storing the actual questions and answers in an array like a dictionary
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

const categories = ["All", "Basic Requirements", "Common Scenarios", "Potential Issues"];

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

// adding a constant glow effect to the toggle buttons
const getCategoryGlowColor = (category: string) => {
  switch (category) {
    case "Basic Requirements":
      return "shadow-[0_0_20px_rgba(232,255,165,0.5)] ring-2 ring-[#E8FFA5]/30";
    case "Common Scenarios":
      return "shadow-[0_0_20px_rgba(255,255,255,0.3)] ring-2 ring-white/20";
    case "Potential Issues":
      return "shadow-[0_0_20px_rgba(176,229,25,0.5)] ring-2 ring-[#B0E519]/30";
    default:
      return "shadow-[0_0_20px_rgba(255,255,255,0.3)] ring-2 ring-white/20";
  }
};

const FAQComponent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQs = activeFilter === "All" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeFilter);

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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">Employee Attendance FAQ</h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? `${getCategoryColor(category)} ${getCategoryGlowColor(category)}`
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items - Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[20px] overflow-hidden shadow-lg">
              {/* Category Tag */}
              <div className="p-4 pb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
                  {faq.category}
                </span>
              </div>
              
              {/* Question */}
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full text-left px-4 pb-4 hover:bg-black/10 transition-colors duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-medium leading-tight pr-2">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="w-4 h-4 text-black" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-black" />
                    )}
                  </div>
                </div>
              </button>
              
              {/* the divider Line with radial gradient */}
              {expandedItems.has(faq.id) && (
                <div className="px-4">
                  <div className="h-px bg-gradient-to-r from-[#BDFF00] via-[#BDFF00] to-[#59FF00] w-full"></div>
                </div>
              )}
              
              {/* Answer */}
              {expandedItems.has(faq.id) && (
                <div className="px-4 py-4 w-full">
                  <div className="text-[#E5E5E5] leading-relaxed w-full">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Items - Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-gray-800 rounded-lg overflow-hidden h-fit">
              {/* Category Tag */}
              <div className="p-4 pb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
                  {faq.category}
                </span>
              </div>
              
              {/* Question */}
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full text-left p-4 pt-2 hover:bg-gray-750 transition-colors duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-medium leading-tight pr-2">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="w-4 h-4 text-black" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-black" />
                    )}
                  </div>
                </div>
              </button>
              
              {/* Answer */}
              {expandedItems.has(faq.id) && (
                <div className="px-4 pb-4">
                  <div className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No FAQ items found for the selected category.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQComponent;