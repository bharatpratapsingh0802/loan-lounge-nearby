
import * as React from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center shadow-md">
      <NavLink 
        to="/" 
        className={({ isActive }) => cn(
          "flex flex-col items-center text-gray-500 hover:text-primary", 
          isActive && "text-primary"
        )}
        end
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/eligibility" 
        className={({ isActive }) => cn(
          "flex flex-col items-center text-gray-500 hover:text-primary", 
          isActive && "text-primary"
        )}
      >
        <FileText size={20} />
        <span className="text-xs mt-1">Eligibility</span>
      </NavLink>
      
      <NavLink 
        to="/offers" 
        className={({ isActive }) => cn(
          "flex flex-col items-center text-gray-500 hover:text-primary", 
          isActive && "text-primary"
        )}
      >
        <Gift size={20} />
        <span className="text-xs mt-1">Offers</span>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        className={({ isActive }) => cn(
          "flex flex-col items-center text-gray-500 hover:text-primary", 
          isActive && "text-primary"
        )}
      >
        <User size={20} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
