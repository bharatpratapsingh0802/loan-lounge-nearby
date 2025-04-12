
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import LoanTypeChips from "@/components/LoanTypeChips";
import LenderCard from "@/components/LenderCard";
import { lenders, loanCategories } from "@/data/lenders";

const HomePage = () => {
  const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null);
  const [filteredLenders, setFilteredLenders] = useState(lenders);

  useEffect(() => {
    if (selectedLoanType === null) {
      setFilteredLenders(lenders);
      return;
    }

    const selectedCategory = loanCategories.find(cat => cat.id === selectedLoanType);
    if (!selectedCategory) return;
    
    const filtered = lenders.filter(lender => 
      lender.loanTypes.includes(selectedCategory.name)
    );
    setFilteredLenders(filtered);
  }, [selectedLoanType]);

  useEffect(() => {
    // Simulate location detection
    const timer = setTimeout(() => {
      toast.success("Location detected: Bangalore, Karnataka");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-20">
      <Header showSearch={true} />
      
      <LoanTypeChips 
        selectedType={selectedLoanType}
        onTypeSelect={setSelectedLoanType}
      />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Nearby Lenders</h2>
          <span className="text-sm text-gray-500">
            {filteredLenders.length} found
          </span>
        </div>
        
        {filteredLenders.length > 0 ? (
          filteredLenders.map(lender => (
            <LenderCard key={lender.id} lender={lender} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No lenders found for this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
