<template>
  <div class="user-avatar" v-if="isUserVisible">
    <div class="user-avatar__inner">
      <img v-if="user" :src="user.photoURL" :alt="user.displayName" @click="logout">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import store from '@/store'
import { useRoute } from 'vue-router'
import { IUser } from '@/types/UserType'
import { useLogin } from '@/use/auth/useLogin'

interface IState {
  user: IUser | null
  useLogin: any
}

export default defineComponent({
  name: 'User',
  setup () {
    const state = {
      user: computed(() => (store.getters['userStore/getUser']))
    }

    const isUserVisible = computed(() => {
      console.log('useRoute().name', useRoute().name)
      return (useRoute().name) !== 'Home'
    })

    const { logout } = useLogin()

    return {
      ...toRefs(state),
      logout,
      isUserVisible
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
