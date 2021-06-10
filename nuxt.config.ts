import type { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  ssr: false,
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: ['nuxt-buefy'],
  head: {
    title: 'BCJI Tools',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  router: {
    mode: 'hash'
  }
};

export default config;
