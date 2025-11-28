import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { SmartCartDrawer } from '../../cart/CartDrawer';
import { CalculatorModal } from '../../common';
import { env } from '../../../config/env';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any>;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description = env.site.description,
  keywords,
  image,
  type = 'website',
  jsonLd,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const fullTitle = title
    ? `${title} | ${env.site.name}`
    : `${env.site.name} - ${env.site.description}`;

  const defaultImage = `${env.site.url}/og-image.jpg`;
  const ogImage = image || defaultImage;

  return (
    <>
      <Helmet>
        {/* Basics */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}

        {/* OpenGraph */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={env.site.url} />
        <meta property="og:site_name" content={env.site.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar
          onOpenCart={() => setIsCartOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer onOpenCalculator={() => setIsCalculatorOpen(true)} />

        {/* Cart Drawer */}
        <SmartCartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        {/* Calculator Modal */}
        <CalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />
      </div>
    </>
  );
};
