import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { env } from '../../../config/env';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#F4F4F6] border-b border-gray-200/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 text-[13px]">
          {/* Left side */}
          <div className="flex items-center gap-6">
            {/* Country/Language selector */}
            <button className="flex items-center gap-1.5 text-gray-600 hover:text-[#4A9FD8] transition-colors group">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium">Chile</span>
              <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="w-px h-4 bg-gray-300/50" />

            {/* Utility links */}
            <Link
              to="/servicios"
              className="text-gray-600 hover:text-[#4A9FD8] transition-colors hover:underline underline-offset-2"
            >
              Centros de servicio
            </Link>

            <div className="w-px h-4 bg-gray-300/50 hidden lg:block" />

            <Link
              to="/nosotros"
              className="text-gray-600 hover:text-[#4A9FD8] transition-colors hover:underline underline-offset-2 hidden lg:block"
            >
              Acerca de Fluxo
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Phone number */}
            <a
              href={`tel:${env.contact.phone}`}
              className="flex items-center gap-2 text-gray-700 hover:text-[#4A9FD8] transition-colors group"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium hidden sm:inline">{env.contact.phone}</span>
            </a>

            <div className="w-px h-4 bg-gray-300/50 hidden md:block" />

            {/* Expert assistance */}
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4A9FD8] to-[#3B8BC0] border border-white" />
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#5AADDE] to-[#4A9FD8] border border-white" />
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6ABCE4] to-[#5AADDE] border border-white" />
              </div>
              <span className="text-[12px]">Asesórate con un experto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
