
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
    <div className="flex overflow-x-auto py-3 px-4 gap-3 no-scrollbar">
      <button
        onClick={() => onTypeSelect(null)} 
        className={cn(
          "flex flex-col items-center justify-center min-w-[72px] px-2 py-2 rounded-full whitespace-nowrap text-sm transition-all", 
          selectedType === null 
            ? "bg-primary text-white shadow-md" 
            : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50"
        )}
      >
        <span className="text-base mb-0.5">🔍</span>
        <span className="text-xs">All</span>
      </button>
      
      {loanCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onTypeSelect(category.id)}
          className={cn(
            "flex flex-col items-center justify-center min-w-[72px] px-2 py-2 rounded-full whitespace-nowrap text-sm transition-all", 
            selectedType === category.id 
              ? "bg-primary text-white shadow-md" 
              : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50"
          )}
        >
          <span className="text-base mb-0.5">{category.icon}</span>
          <span className="text-xs truncate max-w-[80px]">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LoanTypeChips;
