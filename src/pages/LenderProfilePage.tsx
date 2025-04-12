
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Plus, Minus, Upload, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface LoanProduct {
  id: string;
  type: string;
  minInterestRate: string;
  maxInterestRate: string;
  maxLoanAmount: string;
  minTenure: string;
  maxTenure: string;
  processingFee: string;
  requiredDocuments: string[];
}

const documentOptions = [
  "ID Proof", 
  "Address Proof", 
  "Income Proof", 
  "Bank Statements (3 months)", 
  "Tax Returns",
  "Property Documents",
  "Vehicle Documents",
  "Business Proof"
];

const loanTypeOptions = [
  "Personal Loan",
  "Home Loan",
  "Vehicle Loan",
  "Education Loan",
  "Business Loan",
  "Two-Wheeler Loan",
  "Consumer Durable Loan"
];

const LenderProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');

  // Eligibility criteria
  const [minIncome, setMinIncome] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [minCreditScore, setMinCreditScore] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  // Contact details
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [applyNowLink, setApplyNowLink] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  // Loan products
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([
    {
      id: '1',
      type: '',
      minInterestRate: '',
      maxInterestRate: '',
      maxLoanAmount: '',
      minTenure: '',
      maxTenure: '',
      processingFee: '',
      requiredDocuments: []
    }
  ]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddLoanProduct = () => {
    setLoanProducts([
      ...loanProducts,
      {
        id: Date.now().toString(),
        type: '',
        minInterestRate: '',
        maxInterestRate: '',
        maxLoanAmount: '',
        minTenure: '',
        maxTenure: '',
        processingFee: '',
        requiredDocuments: []
      }
    ]);
  };

  const handleRemoveLoanProduct = (id: string) => {
    setLoanProducts(loanProducts.filter(product => product.id !== id));
  };

  const updateLoanProduct = (id: string, field: keyof LoanProduct, value: any) => {
    setLoanProducts(loanProducts.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const toggleDocument = (productId: string, document: string) => {
    setLoanProducts(loanProducts.map(product => {
      if (product.id === productId) {
        const documents = [...product.requiredDocuments];
        if (documents.includes(document)) {
          return { 
            ...product, 
            requiredDocuments: documents.filter(doc => doc !== document) 
          };
        } else {
          return { 
            ...product, 
            requiredDocuments: [...documents, document] 
          };
        }
      }
      return product;
    }));
  };

  const toggleEmploymentType = (type: string) => {
    if (employmentTypes.includes(type)) {
      setEmploymentTypes(employmentTypes.filter(t => t !== type));
    } else {
      setEmploymentTypes([...employmentTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation would go here
    
    toast.success("Lender profile saved successfully");
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title="Create Lender Profile" 
        showBack={true}
        onBackClick={() => navigate('/admin')}
      />
      
      <div className="p-4 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Lender Name*</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. QuickCash Finance"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Quick loans with minimal documentation"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your lending services"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center space-x-4">
                  {logoPreview && (
                    <div className="w-16 h-16 rounded-lg border overflow-hidden">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Products */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loanProducts.map((product, index) => (
                <div key={product.id} className="space-y-4 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-medium">Loan Product {index + 1}</h3>
                    
                    {loanProducts.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveLoanProduct(product.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`loan-type-${product.id}`}>Loan Type*</Label>
                      <select
                        id={`loan-type-${product.id}`}
                        value={product.type}
                        onChange={(e) => updateLoanProduct(product.id, 'type', e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                        required
                      >
                        <option value="">Select Loan Type</option>
                        {loanTypeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`min-interest-${product.id}`}>Min Interest Rate (%)*</Label>
                        <Input
                          id={`min-interest-${product.id}`}
                          type="number"
                          step="0.01"
                          value={product.minInterestRate}
                          onChange={(e) => updateLoanProduct(product.id, 'minInterestRate', e.target.value)}
                          placeholder="e.g. 7.5"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`max-interest-${product.id}`}>Max Interest Rate (%)*</Label>
                        <Input
                          id={`max-interest-${product.id}`}
                          type="number"
                          step="0.01"
                          value={product.maxInterestRate}
                          onChange={(e) => updateLoanProduct(product.id, 'maxInterestRate', e.target.value)}
                          placeholder="e.g. 12.5"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`max-loan-${product.id}`}>Max Loan Amount (₹)*</Label>
                      <Input
                        id={`max-loan-${product.id}`}
                        type="number"
                        value={product.maxLoanAmount}
                        onChange={(e) => updateLoanProduct(product.id, 'maxLoanAmount', e.target.value)}
                        placeholder="e.g. 500000"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`min-tenure-${product.id}`}>Min Tenure (months)*</Label>
                        <Input
                          id={`min-tenure-${product.id}`}
                          type="number"
                          value={product.minTenure}
                          onChange={(e) => updateLoanProduct(product.id, 'minTenure', e.target.value)}
                          placeholder="e.g. 12"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`max-tenure-${product.id}`}>Max Tenure (months)*</Label>
                        <Input
                          id={`max-tenure-${product.id}`}
                          type="number"
                          value={product.maxTenure}
                          onChange={(e) => updateLoanProduct(product.id, 'maxTenure', e.target.value)}
                          placeholder="e.g. 60"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`processing-fee-${product.id}`}>Processing Fee (%)*</Label>
                      <Input
                        id={`processing-fee-${product.id}`}
                        type="number"
                        step="0.01"
                        value={product.processingFee}
                        onChange={(e) => updateLoanProduct(product.id, 'processingFee', e.target.value)}
                        placeholder="e.g. 1.5"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label className="block mb-2">Required Documents*</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {documentOptions.map(document => (
                          <div key={document} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${document}-${product.id}`}
                              checked={product.requiredDocuments.includes(document)}
                              onCheckedChange={() => toggleDocument(product.id, document)}
                            />
                            <Label 
                              htmlFor={`${document}-${product.id}`}
                              className="text-sm"
                            >
                              {document}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddLoanProduct}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Loan Product
              </Button>
            </CardContent>
          </Card>

          {/* Eligibility Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="min-income">Minimum Monthly Income (₹)*</Label>
                <Input
                  id="min-income"
                  type="number"
                  value={minIncome}
                  onChange={(e) => setMinIncome(e.target.value)}
                  placeholder="e.g. 25000"
                  required
                />
              </div>
              
              <div>
                <Label className="block mb-2">Applicable Employment Types*</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Salaried', 'Self-Employed', 'Business Owner', 'Freelancer'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`employment-${type}`}
                        checked={employmentTypes.includes(type)}
                        onCheckedChange={() => toggleEmploymentType(type)}
                      />
                      <Label 
                        htmlFor={`employment-${type}`}
                        className="text-sm"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="min-credit">Minimum Credit Score*</Label>
                <Input
                  id="min-credit"
                  type="number"
                  value={minCreditScore}
                  onChange={(e) => setMinCreditScore(e.target.value)}
                  placeholder="e.g. 650"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-age">Minimum Age*</Label>
                  <Input
                    id="min-age"
                    type="number"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    placeholder="e.g. 21"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="max-age">Maximum Age*</Label>
                  <Input
                    id="max-age"
                    type="number"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    placeholder="e.g. 65"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branch/Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Branch & Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Office Address*</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter complete branch address"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State*</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Maharashtra"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pincode">Pincode*</Label>
                  <Input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 400001"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact">Contact Number*</Label>
                  <Input
                    id="contact"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. contact@lender.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="working-hours">Working Hours*</Label>
                <Input
                  id="working-hours"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  placeholder="e.g. Mon-Fri: 9AM-6PM, Sat: 10AM-2PM"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g. 19.0760"
                  />
                </div>
                
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g. 72.8777"
                  />
                </div>
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  Get coordinates from map
                </Label>
                <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center text-gray-500">
                  Map Integration Placeholder
                </div>
              </div>

              <Separator className="my-4" />
              
              <h3 className="font-medium text-gray-700">Additional Contact Options</h3>
              
              <div>
                <Label htmlFor="whatsapp">WhatsApp Support Number</Label>
                <Input
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                />
              </div>
              
              <div>
                <Label htmlFor="apply-link">Apply Now Link</Label>
                <Input
                  id="apply-link"
                  value={applyNowLink}
                  onChange={(e) => setApplyNowLink(e.target.value)}
                  placeholder="e.g. https://lender.com/apply"
                />
              </div>
              
              <div>
                <Label htmlFor="maps-url">Google Maps URL</Label>
                <Input
                  id="maps-url"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="e.g. https://goo.gl/maps/..."
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end gap-4 -mx-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              Cancel
            </Button>
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LenderProfilePage;
