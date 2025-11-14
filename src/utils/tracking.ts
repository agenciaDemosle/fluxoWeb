import type { TrackingEvent } from '../types';

/**
 * Sistema de tracking básico para eventos del carrito y eCommerce
 * TODO_AURORA: conectar con dataLayer o gtag cuando esté listo
 */
export const trackEvent = (event: TrackingEvent): void => {
  if (typeof window === 'undefined') return;

  console.log('[Tracking Event]', event);

  // TODO: Integrar con Google Analytics 4 / GTM
  // if (window.dataLayer) {
  //   window.dataLayer.push({
  //     event: event.name,
  //     ...event.payload,
  //   });
  // }

  // TODO: Integrar con Facebook Pixel
  // if (window.fbq) {
  //   switch (event.name) {
  //     case 'add_to_cart':
  //       window.fbq('track', 'AddToCart', event.payload);
  //       break;
  //     case 'purchase':
  //       window.fbq('track', 'Purchase', event.payload);
  //       break;
  //   }
  // }
};

/**
 * Inicializa el tracking
 */
export const initTracking = (): void => {
  console.log('[Tracking] Sistema de tracking inicializado');
  // TODO: Inicializar scripts de tracking aquí
};

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined') return;

  console.log('[Tracking] Page View', { path, title });

  // TODO: Integrar con GA4
  // if (window.gtag) {
  //   window.gtag('event', 'page_view', {
  //     page_path: path,
  //     page_title: title,
  //   });
  // }
};
