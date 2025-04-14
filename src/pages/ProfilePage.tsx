
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, Settings, LogOut, Mail, Phone,
  Bell, Lock, Shield
} from 'lucide-react';
import Header from '@/components/Header';

const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+91 98765 43210',
};

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
          </button>
          
          <Separator />
          
          <button className="w-full flex items-center justify-between py-2">
            <div className="flex items-center">
              <Lock size={18} className="text-gray-500 mr-3" />
              <span>Privacy & Security</span>
            </div>
          </button>
          
          <Separator />
          
          <button className="w-full flex items-center justify-between py-2">
            <div className="flex items-center">
              <Shield size={18} className="text-gray-500 mr-3" />
              <span>Data Preferences</span>
            </div>
          </button>
        </div>
        
        <Button 
          variant="destructive" 
          className="w-full mt-4 flex items-center gap-2 justify-center"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
