import { defineStore } from 'pinia';

import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore( 'cart', {
  state: () => ( {
    items: [] as CartItem[],
  } ),
  getters: {
    totalItems: ( state ) => state.items.length,
    totalPrice: ( state ) => state.items.reduce(
      ( total, item ) => total + ( item.product.price * item.quantity ),
      0,
    ),
  },
  actions: {
    addItem( product: Product ) {
      const existingItem = this.items.find( ( item ) => item.product.id === product.id );

      if ( existingItem ) {
        existingItem.quantity = +1;
      } else {
        this.items.push( {
          product,
          quantity: 1,
        } );
      }
    },
    removeItem( productId: number ) {
      this.items = this.items.filter( ( item ) => item.product.id !== productId );
    },
  },
} );
