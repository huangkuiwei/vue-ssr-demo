<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{$store.state.videoHomeTab}}
  </div>
</template>

<script>
export default {
  asyncData ({ store, router }) {
    return store.dispatch('getVideoHomeTab')
  }
}
</script>
