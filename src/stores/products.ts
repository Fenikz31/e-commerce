import { defineStore } from 'pinia';

export interface Product {
  id: number;
  brand: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  price: number;
  images: string[];
  thumbnail: string;
  stock: string;
}

export const useProductStore = defineStore( 'products', {
  state: () => ( {
    products: [] as Product[],
  } ),
  getters: {
    allProducts: ( state ) => state.products,
    productById: ( state ) => ( id: number ) => state.products.find(
      ( product ) => product.id === id,
    ),
  },
  actions: {
    async fetchProducts() {
      const response = await fetch( 'https://dummyjson.com/products' );
      const { products } = await response.json();

      this.products = products;
    },

    addProduct( product: Product ) {
      this.products.push( product );
    },

    removeProduct( id: number ) {
      this.products = this.products.filter( ( product: Product ) => product.id !== id );
    },
  },
} );
