
import React from 'react';
import { Gift, Info, Tag } from 'lucide-react';
import Header from '@/components/Header';

const offers = [
  {
    id: '1',
    title: '50% off on processing fees',
    description: 'Get 50% off on processing fees for all Personal Loans',
    lender: 'QuickCash Finance',
    validUntil: '2025-06-30',
    code: 'QUICK50',
  },
  {
    id: '2',
    title: 'Zero documentation fees',
    description: 'Apply for Home Loans with zero documentation charges',
    lender: 'Metro Credit Union',
    validUntil: '2025-05-15',
    code: 'METROZERO',
  },
  {
    id: '3',
    title: 'Interest rate starting at 6.75%',
    description: 'Special interest rates for Teachers and Healthcare workers',
    lender: 'EasyFunds Bank',
    validUntil: '2025-07-31',
    code: 'EASYHEALTH',
  },
  {
    id: '4',
    title: 'Pre-approved loans up to ₹5 Lakhs',
    description: 'Instant pre-approved loans for existing customers',
    lender: 'Rapid Lenders Co.',
    validUntil: '2025-05-30',
    code: 'RAPIDO5L',
  },
];

const OffersPage = () => {
  return (
    <div className="pb-20">
      <Header title="Special Offers" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Current Offers</h2>
          <span className="text-sm text-gray-500">
            {offers.length} available
          </span>
        </div>
        
        {offers.map(offer => (
          <div 
            key={offer.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xl bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-lg">
                <Gift size={20} />
              </div>
              <div>
                <h3 className="font-medium">{offer.title}</h3>
                <p className="text-xs text-gray-500">by {offer.lender}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">
              {offer.description}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Tag size={16} className="text-primary mr-2" />
                <span className="font-medium">{offer.code}</span>
              </div>
              <div className="text-xs text-gray-500">
                Valid till {new Date(offer.validUntil).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex items-center justify-center gap-2 mt-6 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <Info size={16} />
          <p>New offers are added regularly. Check back often!</p>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
