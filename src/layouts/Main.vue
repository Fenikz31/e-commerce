<template>
  <q-layout style="height: 100%; width: 100%;" view='hHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat label='Home' to='/' />
        <q-btn flat label='About' to='/about' />
      </q-toolbar>
    </q-header>

    <q-page-container
      class=" fit"
      style="height: 100%; width: 100%;"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent( {
  name: 'MainLayout',
} );
</script>
