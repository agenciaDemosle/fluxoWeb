export * from './product';
export * from './cart';
export * from './order';

// Tracking events
export type TrackingEvent =
  | {
      name: 'add_to_cart';
      payload: {
        productId: number;
        type: 'solo_equipo' | 'equipo_mas_instalacion';
        price: number;
        quantity: number;
      };
    }
  | {
      name: 'remove_from_cart';
      payload: {
        productId: number;
      };
    }
  | {
      name: 'begin_checkout';
      payload: {
        itemsCount: number;
        grandTotal: number;
      };
    }
  | {
      name: 'purchase';
      payload: {
        orderId: number;
        grandTotal: number;
        hasInstallation: boolean;
      };
    }
  | {
      name: 'view_item';
      payload: {
        productId: number;
        productName: string;
        price: number;
      };
    };
