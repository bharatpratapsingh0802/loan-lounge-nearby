
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import { lenders, loanCategories } from '@/data/lenders';

const EligibilityPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lender = lenders.find(l => l.id === id);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    income: 50000,
    loanAmount: 100000,
    loanType: '',
    employmentType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Eligibility check submitted successfully!");
    // In a real app, we would submit this data to an API
    
    // Navigate to a success page or back to lender detail
    if (id) {
      navigate(`/lender/${id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="pb-20">
      <Header 
        title="Check Eligibility" 
        showBack={true}
        onBackClick={() => navigate(-1)}
      />

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          {lender && (
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl bg-gray-100 h-10 w-10 flex items-center justify-center rounded-lg">
                {lender.logo}
              </div>
              <div>
                <h3 className="font-medium">{lender.name}</h3>
                <p className="text-xs text-gray-500">
                  Interest: {lender.interestRateRange.min}% - {lender.interestRateRange.max}%
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type</Label>
              <Select
                value={formData.loanType}
                onValueChange={(value) => handleSelectChange('loanType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  {loanCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) => handleSelectChange('employmentType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="income">Monthly Income</Label>
                <span className="text-sm font-medium">₹{formData.income.toLocaleString()}</span>
              </div>
              <Slider
                id="income"
                defaultValue={[formData.income]}
                max={500000}
                min={10000}
                step={5000}
                onValueChange={(value) => handleSliderChange('income', value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹10,000</span>
                <span>₹500,000</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <span className="text-sm font-medium">₹{formData.loanAmount.toLocaleString()}</span>
              </div>
              <Slider
                id="loanAmount"
                defaultValue={[formData.loanAmount]}
                max={2000000}
                min={10000}
                step={10000}
                onValueChange={(value) => handleSliderChange('loanAmount', value)}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹10,000</span>
                <span>₹20,00,000</span>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Check Eligibility
            </Button>
          </form>
        </div>

        <div className="text-xs text-gray-500 text-center px-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
          Your information will be processed securely.
        </div>
      </div>
    </div>
  );
};

export default EligibilityPage;
