
import React from 'react';
import { Search, MapPin, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  className?: string;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showSearch = false,
  className,
  onBackClick
}) => {
  return (
    <header className={cn(
      "sticky top-0 z-10 bg-white shadow-sm px-4 py-3",
      className
    )}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={onBackClick} 
            className="text-gray-700 hover:text-primary"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {title && <h1 className="text-lg font-medium">{title}</h1>}
        
        {showSearch && (
          <div className="flex-1 relative">
            <div className="flex items-center border border-gray-300 rounded-full bg-gray-50 px-3 py-2">
              <MapPin size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search location..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button className="text-primary p-1">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
