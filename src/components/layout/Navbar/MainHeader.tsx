import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, SlidersHorizontal, GitCompare } from 'lucide-react';
import { useCartStore } from '../../../store/useCartStore';

interface MainHeaderProps {
  onOpenCart: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ onOpenCart }) => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useCartStore();

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.lineGrandTotal, 0), [items]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Clear search after navigating
    }
  };

  return (
    <div className="bg-white border-b border-gray-200/60 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-[76px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="text-[#4A9FD8] text-[28px] font-bold tracking-tight transition-opacity group-hover:opacity-80">
              Fluxo
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-[640px]">
            <div className="relative w-full">
              <div
                className={`flex items-center w-full h-[46px] rounded-full border transition-all duration-200 ${
                  searchFocused
                    ? 'border-[#4A9FD8] ring-2 ring-[#4A9FD8]/20'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Search className="absolute left-4 w-5 h-5 text-gray-400" strokeWidth={2} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Busca equipos, marcas o capacidades BTU"
                  className="w-full h-full pl-12 pr-32 bg-transparent text-[14px] text-gray-700 placeholder:text-gray-400 outline-none rounded-full"
                />
                <button
                  type="button"
                  className="absolute right-3 flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-gray-600 hover:text-[#4A9FD8] hover:bg-gray-50 rounded-full transition-all"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
                  <span className="font-medium">Filtros</span>
                </button>
              </div>
            </div>
          </form>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Compare button */}
            <button className="group relative p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200">
              <GitCompare className="w-5 h-5 text-gray-600 group-hover:text-[#4A9FD8]" strokeWidth={1.5} />
            </button>

            {/* Favorites button */}
            <button className="group relative p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-[#4A9FD8]" strokeWidth={1.5} />
            </button>

            {/* Account button */}
            <Link
              to="/cuenta"
              className="group flex items-center gap-2 px-4 py-2.5 bg-[#F3F4F6] hover:bg-white hover:border-[#4A9FD8] hover:text-[#4A9FD8] border border-transparent rounded-full transition-all duration-200"
            >
              <User className="w-4 h-4" strokeWidth={2} />
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-[#4A9FD8]">
                Mi cuenta
              </span>
            </Link>

            {/* Cart button */}
            <button
              onClick={onOpenCart}
              className="group relative flex items-center gap-3 px-5 py-2.5 bg-gray-900 hover:bg-[#2D3748] rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-white" strokeWidth={2} />
              <span className="text-[14px] font-semibold text-white">
                ${totalPrice.toLocaleString('es-CL')}
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-gradient-to-br from-[#FF6B6B] to-[#FF5252] text-white text-[11px] font-bold rounded-full border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <Search className="w-5 h-5 text-gray-600" strokeWidth={2} />
            </button>
            <button
              onClick={onOpenCart}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#FF6B6B] text-white text-[11px] font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="lg:hidden pb-4">
          <div className="relative">
            <div
              className={`flex items-center w-full h-[44px] rounded-full border transition-all duration-200 ${
                searchFocused
                  ? 'border-[#4A9FD8] ring-2 ring-[#4A9FD8]/20'
                  : 'border-gray-300'
              }`}
            >
              <Search className="absolute left-4 w-4.5 h-4.5 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Busca equipos o BTU..."
                className="w-full h-full pl-12 pr-4 bg-transparent text-[14px] text-gray-700 placeholder:text-gray-400 outline-none rounded-full"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
