<template>
  <div class="wrapper page-add">
    <div class="wrapper__inner">
      <div class="add">
        <h1>Hi {{user.displayName}}🤗</h1>
        <h2>Your speeddial</h2>
          <div class="most-used">
            <div class="most-used-buttons">
              <div class="most-used-buttons__inner">
                <AddButton v-for="item in crumbTemplates" :key="item.id" :buttonData="item" :labelTotal="10"/>
              </div>
              <div v-if="!crumbTemplates.length">
                Looks like you don't have any Crumbs yet. So lets get started!
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import store from '@/store'
import { Crumb } from '@/types/Crumb'
import AddButton from '@/components/add/AddButton.vue'
import { seedData } from '@/seed/seed'
import { IUser } from '@/types/UserType'

interface IState {
  favourites: Array<Crumb>;
  crumbs: Array<Crumb>;
  crumbTemplates: Array<Crumb>;
  user: IUser;
}

export default defineComponent({
  name: 'Add',
  components: {
    AddButton
  },
  setup () {
    const state: IState = reactive({
      favourites: seedData,
      crumbs: store.getters['crumbStore/getAllCrumbs'],
      crumbTemplates: computed(() => store.getters['crumbStore/getCrumbTemplates']),
      user: computed(() => store.getters['userStore/getUser'])
    })

    const filteredCrumbs = () => {
      const filteredArray = state.crumbs.filter(function (el:Crumb) {
        return el.label === 'tobacco'
      })

      return filteredArray
    }

    onMounted(() => {
      console.log('')
    })

    return {
      ...toRefs(state),
      filteredCrumbs
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
