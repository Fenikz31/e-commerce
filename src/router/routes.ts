import { RouteRecordRaw } from 'vue-router';

import Home from 'pages/Home.vue';
import Product from 'pages/Product.vue';

const routes: RouteRecordRaw[] = [
  /* {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  }, */
  {
    path: '/',
    component: () => import( 'layouts/Main.vue' ),
    children: [
      { path: '', component: Home },
      {
        path: 'product/:productId',
        component: Product,
        props: true,
      },
    ],
  },
  /* {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/product/:productId',
    component: Product,
    name: 'Product',
    props: true,
  }, */

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import( 'pages/ErrorNotFound.vue' ),
  },
];

export default routes;
