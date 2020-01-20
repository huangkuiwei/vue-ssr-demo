<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{$store.state.musicList}}
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('getMusicList')
  },
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
