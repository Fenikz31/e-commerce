<template>
    <q-card>
      <q-card-title>
        <h1>{{ product.title }}</h1>
      </q-card-title>

      <q-card-section>
        <q-img :src='product.thumbnail' />

        <p>{{ product.description }}</p>

        <q-btn label='Ajouter au panier' />
      </q-card-section>
    </q-card>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { useProductStore } from '../stores/products';

export default defineComponent( {
  name: 'Product',
  props: {
    productId: {
      required: true,
    },
  },
  setup( props ) {
    const productStore = useProductStore();

    const product = computed(
      () => productStore.allProducts
        .find( ( item ) => item.id === parseInt( props.productId, 10 ) ),
    );

    onMounted( () => {
      if ( !product.value ) {
        // Rediriger vers la page d'accueil si le produit n'est pas trouvé
        this.$router.push( '/' );
      }
    } );

    return {
      product,
    };
  },
} );
</script>
