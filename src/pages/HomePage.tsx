
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Header from '@/components/Header';
import LoanTypeChips from '@/components/LoanTypeChips';
import LenderCard from '@/components/LenderCard';
import { Button } from '@/components/ui/button';
import { lenders } from '@/data/lenders';

const HomePage = () => {
  const navigate = useNavigate();

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
          <LoanTypeChips />
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Nearby Lenders</h2>
            <Button variant="link" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {lenders.map(lender => (
              <LenderCard key={lender.id} lender={lender} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
