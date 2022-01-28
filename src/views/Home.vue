<template>
  <div class="wrapper page-home" style="padding-top: 300px">
    <div class="wrapper__inner">
      <div>Mooie illustratie hier</div>
      <h1>Track anything, anywehere...</h1>
      <router-link to="/login">Login</router-link> |
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'


@Options({
  name: 'Home',
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
