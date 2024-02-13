<template>
  <q-layout view='h-h'>
    <q-header>
      <q-toolbar>
        <q-btn flat label='Home' to='/' />
        <q-btn flat label='About' to='/about' />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-card>
        <q-card-title>
          <h1>Panier</h1>
        </q-card-title>

        <q-card-section>
          <q-list v-for='item in items' :key='item.product.id'>
            <q-item>
              <q-item-side>
                <q-img :src='item.product.image' />
              </q-item-side>

              <q-item-main>
                <q-item-label>{{ item.product.name }}</q-item-label>
                <q-item-sublabel>{{ item.product.price }}</q-item-sublabel>

                <q-input type='number' v-model='item.quantity' min='1' />
              </q-item-main>

              <q-item-right>
                <q-btn flat label='Supprimer' @click='removeItem(item.product.id)' />
              </q-item-right>
            </q-item>
          </q-list>

          <q-card-actions>
            <q-btn label='Valider la commande' type='submit' />
          </q-card-actions>
        </q-card-section>

        <q-card-section>
          <q-form @submit='submitOrder'>
            <q-input label='Nom' v-model='name' required />
            <q-input label='Adresse' v-model='address' required />
            <q-input label='Code postal' v-model='postalCode' required />
            <q-input label='Ville' v-model='city' required />
            <q-btn label='Valider la commande' type='submit' :disabled='!formIsValid' />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';

export default defineComponent( {
  name: 'Cart',
  setup() {
    const cartStore = useCartStore();

    const name = ref( '' );
    const address = ref( '' );
    const postalCode = ref( '' );
    const city = ref( '' );

    const formIsValid = computed(
      () => name.value && address.value && postalCode.value && city.value,
    );

    const submitOrder = async () => {
      const order = {
        name: name.value,
        address: address.value,
        postalCode: postalCode.value,
        city: city.value,
        products: cartStore.items.map( ( item ) => ( {
          productId: item.product.id,
          quantity: item.quantity,
        } ) ),
      };

      const response = await fetch( '/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( order ),
      } );

      if ( response.ok ) {
        // Afficher un message de confirmation
        // Rediriger vers une page de confirmation
      } else {
        // Afficher un message d'erreur
      }
    };

    return {
      items: cartStore.items,
      removeItem: cartStore.removeItem,
      name,
      address,
      postalCode,
      city,
      formIsValid,
      submitOrder,
    };
  },
} );
</script>
