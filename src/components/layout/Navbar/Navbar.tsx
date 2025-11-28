import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { TopBar } from './TopBar';
import { MainHeader } from './MainHeader';
import { CategoryNavbar } from './CategoryNavbar';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC<{ onOpenCart: () => void; onOpenCalculator: () => void }> = ({ onOpenCart, onOpenCalculator }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header Wrapper */}
      <header className="sticky top-0 z-50">
        {/* Top Bar - Hidden on mobile, slides up on scroll */}
        <div
          className={`hidden md:block transition-all duration-300 overflow-hidden ${
            isScrolled
              ? 'max-h-0 opacity-0'
              : 'max-h-10 opacity-100'
          }`}
        >
          <TopBar />
        </div>

        {/* Main Header - always visible with shadow on scroll */}
        <div className={`bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
          {/* Main Header */}
          <div className="relative">
            {/* Mobile Menu Button - Absolute positioned over MainHeader */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-gray-100 rounded-full transition-all"
              style={{ top: '38px' }} // Centered in the 76px header
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
              )}
            </button>

            <MainHeader onOpenCart={onOpenCart} />
          </div>

          {/* Category Navbar */}
          <CategoryNavbar onOpenCalculator={onOpenCalculator} />
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCalculator={onOpenCalculator}
      />
    </>
  );
};
