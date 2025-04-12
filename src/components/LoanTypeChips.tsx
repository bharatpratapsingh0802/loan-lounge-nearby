
import React from 'react';
import { loanCategories } from '@/data/lenders';
import { cn } from '@/lib/utils';

interface LoanTypeChipsProps {
  selectedType: string | null;
  onTypeSelect: (id: string | null) => void;
}

const LoanTypeChips: React.FC<LoanTypeChipsProps> = ({ 
  selectedType, 
  onTypeSelect 
}) => {
  return (
    <div className="flex overflow-x-auto py-3 px-4 gap-2 no-scrollbar">
      <button
        onClick={() => onTypeSelect(null)} 
        className={cn(
          "flex flex-col items-center justify-center min-w-[80px] px-3 py-2 rounded-full whitespace-nowrap text-sm transition-all", 
          selectedType === null 
            ? "bg-primary text-white shadow-md" 
            : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50"
        )}
      >
        <span className="text-lg">🔍</span>
        <span>All</span>
      </button>
      
      {loanCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onTypeSelect(category.id)}
          className={cn(
            "flex flex-col items-center justify-center min-w-[80px] px-3 py-2 rounded-full whitespace-nowrap text-sm transition-all", 
            selectedType === category.id 
              ? "bg-primary text-white shadow-md" 
              : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50"
          )}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LoanTypeChips;
