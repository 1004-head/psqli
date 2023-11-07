<template>
  <div class="home">
    <HelloWorld msg="Welcome to PSQLI service!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
.home{
  margin-top: 100px;
}
</style>
