import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Wind } from 'lucide-react';
import { env } from '../../../config/env';

interface FooterProps {
  onOpenCalculator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCalculator }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-subtle border-t border-border-lighter mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo y descripción */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="text-2xl font-bold text-primary">
                {env.site.name}
              </div>
            </Link>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              Aires acondicionados con instalación profesional en todo Chile.
            </p>

            {/* Redes Sociales */}
            <div className="flex space-x-3">
              {env.social.instagram && (
                <a
                  href={env.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-primary/20 rounded-full hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center group"
                >
                  <Instagram className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </a>
              )}
              {env.social.facebook && (
                <a
                  href={env.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-primary/20 rounded-full hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center group"
                >
                  <Facebook className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </a>
              )}
              {env.social.youtube && (
                <a
                  href={env.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-primary/20 rounded-full hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center group"
                >
                  <Youtube className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/instalacion"
                  className="text-sm text-text-muted hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1 h-1 bg-coral rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Instalación Profesional
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios"
                  className="text-sm text-text-muted hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1 h-1 bg-coral rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Mantención y Reparación
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="text-sm text-text-muted hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="w-1 h-1 bg-coral rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Calculadora de BTU
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a
                  href={`tel:${env.contact.phone}`}
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {env.contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a
                  href={`mailto:${env.contact.email}`}
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {env.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-text-muted">
                  Santiago, Chile
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-lighter">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-text-muted">
              &copy; {currentYear} {env.site.name}. Todos los derechos reservados.
            </p>
            <a
              href="https://www.demosle.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors group"
            >
              <span>Hecho con</span>
              <Wind className="w-4 h-4 text-coral group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Demosle</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
