<template>
  <div class="wrapper">
    TEMP
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  name: 'Temp',
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
