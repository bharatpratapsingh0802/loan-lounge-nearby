
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ChevronRight, MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import LoanTypeChips from '@/components/LoanTypeChips';
import LenderCard from '@/components/LenderCard';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { lenders } from '@/data/lenders';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const filteredLenders = lenders.filter(
    lender => selectedLoanType === null || lender.loanTypes.includes(selectedLoanType)
  );

  return (
    <>
      <Header 
        showSearch 
        className="mb-4"
      >
        <Button 
          asChild 
          variant="outline" 
          size="sm" 
          className="ml-auto"
        >
          <Link to="/admin">
            <LogIn className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      </Header>

      <div className="px-4 pb-20">
        <section className="mb-6">
          <LoanTypeChips 
            selectedType={selectedLoanType}
            onTypeSelect={setSelectedLoanType}
          />
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Nearby Lenders</h2>
            <Button variant="link" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          
          {isMobile ? (
            <div className="space-y-2">
              {filteredLenders.map(lender => (
                <div key={lender.id} className="bg-white rounded-lg shadow-sm border p-3">
                  <Link to={`/lender/${lender.id}`} className="flex items-center gap-3">
                    <div className="text-xl bg-gray-100 h-10 w-10 flex items-center justify-center rounded-lg">
                      {lender.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{lender.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{lender.rating}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          <span>{lender.distance} km</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLenders.map(lender => (
                <LenderCard key={lender.id} lender={lender} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default HomePage;
