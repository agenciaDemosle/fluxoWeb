import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Wind } from 'lucide-react';
import { env } from '../../../config/env';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-muted border-t border-border-soft mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="text-h3 font-bold text-gradient">
                {env.site.name}
              </div>
            </Link>
            <p className="text-sm text-text-muted mb-4">
              Aires acondicionados con instalación profesional en todo Chile.
            </p>

            {/* Redes Sociales */}
            <div className="flex space-x-3">
              {env.social.instagram && (
                <a
                  href={env.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {env.social.facebook && (
                <a
                  href={env.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {env.social.youtube && (
                <a
                  href={env.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/instalacion"
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  Instalación Profesional
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios"
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  Mantención y Reparación
                </Link>
              </li>
              <li>
                <Link
                  to="/calculadora"
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  Calculadora de BTU
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <a
                  href={`tel:${env.contact.phone}`}
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {env.contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${env.contact.email}`}
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {env.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm text-text-muted">
                  Santiago, Chile
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-soft">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-text-muted">
              &copy; {currentYear} {env.site.name}. Todos los derechos
              reservados.
            </p>
            <a
              href="https://www.demosle.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
            >
              Hecho con <Wind className="w-3 h-3" /> Demosle
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
