<template>
  <div>
    <Hero />
    <cards />
  </div>
</template>

<script>
import Hero from './components/Hero.vue'
import Cards from './components/Cards.vue'

export default {
  name: 'App',
  components: {
    Hero,
    Cards
  }
}
</script>

<style src="./css/bulma.min.css"></style>

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
