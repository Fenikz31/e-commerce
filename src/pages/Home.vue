<template>
  <h1>Produits</h1>
  <div class="q-pa-md row items-start q-gutter-md justify-around">
    <q-list v-for='product in products' :key='product.id'>
      <q-card class='card column flex flex-center justify-evenly'>
        <q-card-section
          class="column flex flex-center fit justify-evenly"
          style="height: 100%; width: 100%;"
        >
          <div style="height: 400px; width: 350px;">
            <img
              :id='product.id'
              :src='product.thumbnail'
              @click="onClick"
              style="height: 100%; width: 100%;"
            />
          </div>
          <q-item
            class="column flex full-width"
            :id="'item-' + product.id"
          >
            <q-item-section
              class="column flex full-width"
            :id="'item-section-' + product.id"
            >
              <q-item-label
                class="flex flex-center full-width"
                header
                overline
                :id='product.id'
                @click="onClick"
              >
                {{ product.title }}
              </q-item-label>
              <div
                class="flex"
              >
                <q-icon
                  v-for="(key, index) in product.stars"
                  :key="index"
                  :name="key"
                  class="text-orange"
                  style="padding-bottom: 16px;"
                />
              </div>
              <q-item-label
                class="flex full-width"
                  style="padding-bottom: 8px;"
              >
                <span id="price" class="flex" >
                  <span
                    style="font-size: x-large;"
                  >
                    {{ product.price }}
                  </span>
                  <span>
                    €
                  </span>
                </span>
                <span style="color: crimson; padding-left: 8px;">
                  {{ product.discountPercentage }}%
                </span>
              </q-item-label>
            </q-item-section>

            <!-- <q-item-section>
              <q-btn label='Voir le produit' :to='`/product/${ parseInt(product.id) }`' />
            </q-item-section> -->
          </q-item>
        </q-card-section>
      </q-card>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent( {
  name: 'Home',
  methods: {
    async getCategories() {
      try {
        const result = await this.$api.get( 'https://dummyjson.com/products/categories' );
        const { data } = result;
        this.categories = data;
      } catch ( error ) {
        console.error( error );
      }
    },
    async getProducts() {
      try {
        const result = await this.$api.get( 'https://dummyjson.com/products' );
        const { data } = result;
        this.products = data.products.map( ( item ) => {
          item.stars = this.generateStars( item.rating );
          return item;
        } );
      } catch ( error ) {
        console.log( error );
      }
    },
  },

  mounted() {
    this.getCategories();
    this.getProducts();
  },

  setup() {
    const categories = ref( [] );
    const products = ref( [] );
    const productId = ref( null );

    function generateStars( rating ) {
      const stars = [];
      const fullStars = Math.floor( rating );
      const halfStar = rating % 1 >= 0.5;

      // eslint-disable-next-line no-plusplus
      for ( let i = 0; i < fullStars; i++ ) {
        // stars.push( '<q-icon style="height: 40px; width:40px;" name="star" ></q-icon>' );
        stars.push( 'star' );
      }

      if ( halfStar ) {
        stars.push( 'star_half' );
        // stars.push( '<q-icon style="height: 40px; width:40px;" name="star_half" ></q-icon>' );
      }

      // eslint-disable-next-line no-plusplus
      for ( let i = fullStars + halfStar; i < 5; i++ ) {
        stars.push( 'star_outline' );
        // stars.push( '<q-icon style="height: 40px; width:40px;" name="star_outline" ></q-icon>' );
      }

      return stars;
    }

    function onClick( e ) {
      productId.value = e.target.id;
    }

    return {
      categories,
      generateStars,
      onClick,
      products,
    };
  },
} );
</script>

<style lang='sass' scoped>
.card
  height: 600px
  width: 400px
  max-width: 400px
  display: flex
</style>
