
export interface Lender {
  id: string;
  name: string;
  logo: string;
  interestRateRange: {
    min: number;
    max: number;
  };
  loanTypes: string[];
  distance: number;
  rating: number;
  address: string;
  description: string;
  maxLoanAmount: number;
  processingTime: string;
  documents: string[];
}

export const loanCategories = [
  {
    id: 'personal',
    name: 'Personal Loan',
    icon: '💰'
  },
  {
    id: 'two-wheeler',
    name: 'Two-Wheeler',
    icon: '🛵'
  },
  {
    id: 'consumer-durable',
    name: 'Consumer Durable',
    icon: '📱'
  },
  {
    id: 'home',
    name: 'Home Loan',
    icon: '🏠'
  },
  {
    id: 'education',
    name: 'Education Loan',
    icon: '🎓'
  },
  {
    id: 'business',
    name: 'Business Loan',
    icon: '💼'
  },
  {
    id: 'vehicle',
    name: 'Vehicle Loan',
    icon: '🚗'
  }
];

export const lenders: Lender[] = [
  {
    id: '1',
    name: 'QuickCash Finance',
    logo: '🏦',
    interestRateRange: {
      min: 8.5,
      max: 12.25
    },
    loanTypes: ['Personal Loan', 'Two-Wheeler', 'Consumer Durable'],
    distance: 1.2,
    rating: 4.5,
    address: '123 Finance Street, Downtown',
    description: 'QuickCash Finance offers quick approval personal loans and consumer loans with minimal documentation.',
    maxLoanAmount: 500000,
    processingTime: '24 hours',
    documents: ['ID Proof', 'Address Proof', 'Income Proof', 'Bank Statements (3 months)']
  },
  {
    id: '2',
    name: 'Rapid Lenders Co.',
    logo: '💵',
    interestRateRange: {
      min: 9.0,
      max: 13.5
    },
    loanTypes: ['Personal Loan', 'Home Loan', 'Education Loan'],
    distance: 0.8,
    rating: 4.2,
    address: '456 Loan Avenue, Uptown',
    description: 'Rapid Lenders specializes in quick disbursement loans with flexible repayment options.',
    maxLoanAmount: 1000000,
    processingTime: '48 hours',
    documents: ['ID Proof', 'Address Proof', 'Income Proof', 'Property Documents (for home loans)']
  },
  {
    id: '3',
    name: 'EasyFunds Bank',
    logo: '🏛️',
    interestRateRange: {
      min: 7.5,
      max: 10.75
    },
    loanTypes: ['Personal Loan', 'Business Loan', 'Vehicle Loan'],
    distance: 1.5,
    rating: 4.7,
    address: '789 Money Road, Midtown',
    description: 'EasyFunds Bank provides competitive interest rates with transparent terms and no hidden charges.',
    maxLoanAmount: 2000000,
    processingTime: '3-5 days',
    documents: ['ID Proof', 'Address Proof', 'Income Tax Returns (2 years)', 'Business Proof (for business loans)']
  },
  {
    id: '4',
    name: 'SecureTrust Financial',
    logo: '💳',
    interestRateRange: {
      min: 8.25,
      max: 11.5
    },
    loanTypes: ['Home Loan', 'Vehicle Loan', 'Education Loan'],
    distance: 2.1,
    rating: 4.4,
    address: '321 Secure Plaza, Eastside',
    description: 'SecureTrust Financial offers tailored loan products with personalized customer service.',
    maxLoanAmount: 5000000,
    processingTime: '5-7 days',
    documents: ['ID Proof', 'Address Proof', 'Income Proof', 'Property Valuation (for secured loans)']
  },
  {
    id: '5',
    name: 'Metro Credit Union',
    logo: '💹',
    interestRateRange: {
      min: 6.75,
      max: 9.25
    },
    loanTypes: ['Personal Loan', 'Home Loan', 'Business Loan'],
    distance: 0.5,
    rating: 4.8,
    address: '567 Union Street, Westside',
    description: 'Metro Credit Union members enjoy preferential rates and exceptional service with fast approval times.',
    maxLoanAmount: 3000000,
    processingTime: '1-3 days',
    documents: ['ID Proof', 'Address Proof', 'Income Proof', 'Credit Score Report']
  }
];
