import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ChevronRight, MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoanTypeChips from '@/components/LoanTypeChips';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { lenders } from '@/data/lenders';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedLoanType, setSelectedLoanType] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const filteredLenders = lenders.filter(
    lender => selectedLoanType === null || lender.loanTypes.includes(selectedLoanType)
  );

  return (
    <div className="min-h-screen flex flex-col">
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
            Login
          </Link>
        </Button>
      </Header>

      <div className="flex-1 px-4 pb-20">
        <section className="mb-6">
          <LoanTypeChips 
            selectedType={selectedLoanType}
            onTypeSelect={setSelectedLoanType}
          />
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Nearby Loan Agents</h2>
            <Button variant="link" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          
          {isMobile ? (
            <div className="space-y-2">
              {filteredLenders.map(lender => (
                <div key={lender.id} className="bg-white rounded-lg shadow-sm border p-3">
                  <Link to={`/lender/${lender.id}`} className="flex items-center gap-3">
                    <div className="text-xl bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full">
                      {lender.name.charAt(0)}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredLenders.map(lender => (
                <Card key={lender.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={`/lender/${lender.id}`} className="block">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-xl bg-gray-100 h-12 w-12 flex items-center justify-center rounded-full">
                          {lender.name.charAt(0)}
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
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Interest Rate</p>
                          <p className="font-medium text-primary">
                            {lender.interestRateRange.min}% - {lender.interestRateRange.max}%
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-gray-500 text-xs">Max Loan</p>
                          <p className="font-medium">₹{lender.maxLoanAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {lender.loanTypes.slice(0, 2).map((type, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {type}
                          </span>
                        ))}
                        {lender.loanTypes.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            +{lender.loanTypes.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-primary px-4 py-2 text-white text-center text-sm">
                      Contact Agent
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
