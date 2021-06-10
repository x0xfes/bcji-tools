<template lang="pug">
  b-navbar(wrapper-class="container is-max-desktop").is-light
    template(slot="brand")
      b-navbar-item(tag="nuxt-link" to="/").is-size-5.has-text-weight-bold BCJI Tools
    template(slot="start")
      b-navbar-item(tag="nuxt-link" to="/chat") Chat
</template>
