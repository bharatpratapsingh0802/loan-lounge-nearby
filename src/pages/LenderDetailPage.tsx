import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, File, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { lenders } from '@/data/lenders';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

const LenderDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lender = lenders.find(l => l.id === id);

  if (!lender) {
    return (
      <div className="p-4 text-center">
        <p>Lender not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Header 
        title={lender.name} 
        showBack={true}
        onBackClick={() => navigate(-1)}
      />
      
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl bg-gray-100 h-16 w-16 flex items-center justify-center rounded-lg">
              {lender.logo}
            </div>
            <div>
              <h1 className="font-medium text-xl">{lender.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm">
                  <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{lender.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{lender.distance} km</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-700 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <MapPin size={16} className="mt-0.5 text-gray-500 flex-shrink-0" />
              <span>{lender.address}</span>
            </div>
            <div className="flex items-start gap-2 mb-2">
              <Clock size={16} className="mt-0.5 text-gray-500 flex-shrink-0" />
              <span>Processing time: {lender.processingTime}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4">
            {lender.description}
          </p>
          
          <Button 
            onClick={() => navigate(`/eligibility/${lender.id}`)}
            className="w-full"
          >
            {t('check_eligibility')}
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
          <h2 className="text-lg font-medium mb-3">{t('loan_details')}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">{t('interest_rate')}</p>
              <p className="font-medium text-primary">
                {lender.interestRateRange.min}% - {lender.interestRateRange.max}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('max_loan_amount')}</p>
              <p className="font-medium">₹{lender.maxLoanAmount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">{t('available_loan_types')}</p>
            <div className="flex flex-wrap gap-2">
              {lender.loanTypes.map((type, idx) => (
                <span 
                  key={idx} 
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-medium mb-3">{t('required_documents')}</h2>
          
          <div className="space-y-2">
            {lender.documents.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm">
                <File size={16} className="text-gray-500" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button 
              onClick={() => navigate(`/eligibility/${lender.id}`)}
              variant="outline" 
              className="w-full justify-between"
            >
              {t('apply_now')}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderDetailPage;
