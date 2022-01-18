<template>
  <div class="wrapper">
    <div class="hompepage-dashboard-summary">
      <h1>Today's Crap total: <span class="momey">€12,45</span></h1>
    </div>
    <div class="homepage-most-used">
      <div class="most-used-buttons">
        <div class="most-used-buttons__inner">
          <div class="most-used-button">
            tobacco
          </div>
          <div class="most-used-button">
            sweets
          </div>
        </div>
      </div>
    </div>
    <div class="home">
      <HelloWorld msg="Welcome t  o Your Vue.js + TypeScript App"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  name: 'Home',
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
