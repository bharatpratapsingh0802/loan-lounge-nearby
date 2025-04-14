
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              We connect borrowers with trusted local loan agents to help you get the best loan terms.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>How it Works</li>
              <li>Find an Agent</li>
              <li>Loan Types</li>
              <li>FAQs</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-gray-600" />
              <Twitter className="h-5 w-5 text-gray-600" />
              <Instagram className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Loan Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
