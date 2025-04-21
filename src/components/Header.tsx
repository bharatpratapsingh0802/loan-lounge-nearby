
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBackClick }) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            {showBack && (
              <Button variant="ghost" size="icon" onClick={onBackClick}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {title && <h1 className="font-medium">{t(title)}</h1>}
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
