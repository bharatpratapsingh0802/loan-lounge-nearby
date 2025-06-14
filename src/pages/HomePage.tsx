
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ChevronRight, MapPin, Star, LogOut, UserPlus } from 'lucide-react';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoanTypeChips from '@/components/LoanTypeChips';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { lenders } from '@/data/lenders';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedLoanType, setSelectedLoanType] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  // Use AuthContext for auth status and logout
  const { user, signOut } = useAuth();

  const filteredLenders = lenders.filter(
    lender => selectedLoanType === null || lender.loanTypes.includes(selectedLoanType)
  );

  const handleLenderClick = (e: React.MouseEvent, lenderId: string) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please login first to view lender details");
      navigate('/admin');
    } else {
      navigate(`/lender/${lenderId}`);
    }
  };

  const handleLogout = async () => {
    await signOut();
    // Redirect handled by auth context
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Header showSearch className="mb-0">
        <div className="ml-auto flex gap-2">
          {!user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </Header>

      {/* HERO SECTION */}
      <section className="relative py-10 px-4 md:py-16 md:px-0 bg-gradient-to-b from-blue-100/50 to-transparent">
        <div className="absolute inset-0 pointer-events-none select-none z-0 flex justify-end md:justify-center items-center">
          {/* Responsive, soft shadowed, beautiful photo - for visual warmth */}
          <img
            src="/photo-1721322800607-8c38375eef04"
            alt="Connect with local lenders"
            className="hidden md:block max-w-md rounded-3xl shadow-2xl border-[6px] border-blue-50 opacity-90 object-cover"
            style={{ marginRight: '6vw' }}
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto md:ml-0 md:pl-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-700 via-blue-700 to-blue-400 bg-clip-text text-transparent drop-shadow">
            Find Your Perfect Loan Agent Quickly
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700">
            Compare trusted lenders, check your eligibility, and get the best loan offers near you. Simple, fast, and secure.
          </p>
          <div className="flex gap-3">
            <Button className="text-lg px-7 py-3 shadow-lg ring-2 ring-blue-200 hover:ring-blue-400 animate-fade-in" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
            <Button variant="outline" className="text-lg px-6 py-3" onClick={() => window.scrollBy({ top: 380, behavior: 'smooth' })}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <div className="flex-1 px-4 pb-20">

        {/* Loan chips with subtle shadow for elevated design */}
        <section className="mb-8 -mt-4">
          <div className="max-w-2xl mx-auto rounded-xl shadow-md bg-white/80 p-3 md:p-4">
            <LoanTypeChips 
              selectedType={selectedLoanType}
              onTypeSelect={setSelectedLoanType}
            />
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Nearby Loan Agents</h2>
            <Button variant="link" size="sm" className="text-primary font-semibold">
              View All
            </Button>
          </div>
          
          {isMobile ? (
            <div className="space-y-3">
              {filteredLenders.map(lender => (
                <div key={lender.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all p-4">
                  <Link 
                    to={`/lender/${lender.id}`} 
                    className="flex items-center gap-3"
                    onClick={(e) => handleLenderClick(e, lender.id)}
                  >
                    <div className="text-xl bg-gradient-to-br from-blue-100 to-indigo-100 h-12 w-12 flex items-center justify-center rounded-full font-bold text-blue-700 shadow">
                      {lender.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{lender.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{lender.rating}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          <span>{lender.distance} km</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {filteredLenders.map(lender => (
                <Card key={lender.id} className="overflow-hidden hover:shadow-2xl shadow-lg transition-shadow bg-gradient-to-br from-white via-blue-50 to-white border-2 border-blue-100 hover:border-blue-300 group">
                  <Link 
                    to={`/lender/${lender.id}`} 
                    className="block"
                    onClick={(e) => handleLenderClick(e, lender.id)}
                  >
                    <div className="p-6 pb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-xl bg-gradient-to-br from-blue-200 to-indigo-200 h-14 w-14 flex items-center justify-center rounded-full font-bold text-blue-700 shadow group-hover:scale-105 transition-transform duration-200">
                          {lender.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{lender.name}</h3>
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
                          <p className="font-semibold text-primary">
                            {lender.interestRateRange.min}% - {lender.interestRateRange.max}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-xs">Max Loan</p>
                          <p className="font-semibold">₹{lender.maxLoanAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {lender.loanTypes.slice(0, 2).map((type, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {type}
                          </span>
                        ))}
                        {lender.loanTypes.length > 2 && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            +{lender.loanTypes.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-primary to-blue-500 px-4 py-2 text-white text-center text-sm font-semibold shadow-inner">
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

// NOTE: This file is now long (>200 lines). Please consider refactoring it into smaller components!
