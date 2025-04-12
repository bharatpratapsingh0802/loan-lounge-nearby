
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, Settings, History, LogOut, Mail, Phone, 
  FileText, ChevronRight, Lock, Bell, Shield
} from 'lucide-react';
import Header from '@/components/Header';

const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+91 98765 43210',
};

const applicationHistory = [
  {
    id: '1',
    lender: 'QuickCash Finance',
    type: 'Personal Loan',
    amount: 200000,
    date: '2025-03-28',
    status: 'Approved',
  },
  {
    id: '2',
    lender: 'Metro Credit Union',
    type: 'Home Loan',
    amount: 1500000,
    date: '2025-02-15',
    status: 'In Review',
  },
  {
    id: '3',
    lender: 'EasyFunds Bank',
    type: 'Vehicle Loan',
    amount: 500000,
    date: '2025-01-10',
    status: 'Rejected',
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="pb-20">
      <Header title="My Profile" />

      <div className="p-4">
        <div className="mb-4 flex justify-center">
          <Avatar className="h-20 w-20">
            <div className="bg-primary text-white flex items-center justify-center w-full h-full text-2xl font-medium">
              {userProfile.name.split(' ').map(name => name[0]).join('')}
            </div>
          </Avatar>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium">{userProfile.name}</h2>
          <p className="text-gray-500 text-sm">{userProfile.email}</p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <User size={18} className="mr-2 text-primary" />
                Personal Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm">{userProfile.email}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <span className="text-sm">{userProfile.phone}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                size="sm"
              >
                Edit Profile
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 space-y-3">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Settings size={18} className="mr-2 text-primary" />
                Settings
              </h3>
              
              <button className="w-full flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Bell size={18} className="text-gray-500 mr-3" />
                  <span>Notifications</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              
              <Separator />
              
              <button className="w-full flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Lock size={18} className="text-gray-500 mr-3" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              
              <Separator />
              
              <button className="w-full flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Shield size={18} className="text-gray-500 mr-3" />
                  <span>Data Preferences</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full mt-4 flex items-center gap-2 justify-center"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </TabsContent>
          
          <TabsContent value="applications" className="mt-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <History size={18} className="mr-2 text-primary" />
                Loan Applications
              </h3>
              
              {applicationHistory.length > 0 ? (
                <div className="space-y-4">
                  {applicationHistory.map(application => (
                    <div 
                      key={application.id}
                      className="p-3 border border-gray-100 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{application.lender}</h4>
                          <p className="text-xs text-gray-500">{application.type}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          application.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : application.status === 'Rejected' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>₹{application.amount.toLocaleString()}</span>
                        <span className="text-gray-500">
                          {new Date(application.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No loan applications yet</p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                size="sm"
              >
                View All History
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
