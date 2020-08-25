<template>
  <div>
    <Hero />
    <USMap id="usmap" />
    <tabs />
  </div>
</template>

<script>
import Hero from '@/components/main_page/Hero.vue'
import Tabs from '@/components/main_page/Tabs.vue'
import USMap from '@/components/graphs/US-map.vue'

export default {
  name: 'App',
  components: {
    Hero,
    Tabs,
    USMap
  }
}
</script>

<style src="@/styles/css/bulma.min.css"></style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
