import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Lender } from '@/data/lenders';
import { Button } from '@/components/ui/button';

interface LenderCardProps {
  lender: Lender;
}

const LenderCard: React.FC<LenderCardProps> = ({ lender }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Please login first to view lender details");
    navigate('/admin');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <Link to={`/lender/${lender.id}`} className="block" onClick={handleCardClick}>
        <div className="flex items-center gap-4 mb-3">
          <div className="text-3xl bg-gray-100 h-12 w-12 flex items-center justify-center rounded-lg">
            {lender.logo}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{lender.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                <span>{lender.rating}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{lender.distance} km</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="font-medium text-primary">
              {lender.interestRateRange.min}% - {lender.interestRateRange.max}%
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Max Loan</p>
            <p className="font-medium">₹{lender.maxLoanAmount.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {lender.loanTypes.slice(0, 3).map((type, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {type}
            </span>
          ))}
          {lender.loanTypes.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{lender.loanTypes.length - 3} more
            </span>
          )}
        </div>
        
        <Button asChild className="w-full">
          <Link to={`/eligibility/${lender.id}`} onClick={handleCardClick}>
            Check Eligibility
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LenderCard;
