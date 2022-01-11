<template>
  <div class="wrapper">
    <div class="add">
      <h1>Add</h1>
        <div class="most-used">
          <div class="most-used-buttons">
            <div class="most-used-buttons__inner">
                <AddButton v-for="favourite in favourites" :key="favourite.id" :buttonData="favourite" :labelTotal="10"/>
            </div>
          </div>
        </div>
        <div class="crumbs">
          <div> hellup</div>
          <div v-for="crumb in filteredCrumbs()" :key="crumb.label" class="crumb__item">
            {{crumb.label}} - {{crumb.amount}} - {{crumb.date.toLocaleDateString()}} -- {{crumb.date.toLocaleTimeString()}}
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import store from '@/store'
import { ICrumb } from '@/types/CrumbType'
import AddButton from '@/components/add/AddButton.vue'
import { seedData } from '@/seed/seed'

interface IState {
  favourites: Array<ICrumb>;
  crumbs: Array<ICrumb>;
}

export default defineComponent({
  name: 'Add',
  components: {
    AddButton
  },
  setup () {
    const state: IState = reactive({
      favourites: seedData,
      crumbs: store.getters['crumbStore/getAllCrumbs']
    })

    const filteredCrumbs = () => {
      const filteredArray = state.crumbs.filter(function (el:ICrumb) {
        return el.label === 'tobacco'
      })

      return filteredArray
    }

    onMounted(() => {
      store.dispatch('crumbStore/loadCrumbs')
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  width: 100%;
  min-height: 100vh;
  background: #FFEFE5;
}

h1 {
    font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 900;
  font-size: 24px;
}

.crumbs {
  padding: 1rem;
  .crumb__item {
    background: #fbfbfb;
    padding: 1rem;
    margin-bottom: 0.2rem;
    border-radius: 3px;

    &.color {
      background: #333;
    }
  }
}

.most-used-buttons {
  &__inner {
    padding: 2rem;
  }
}

</style>
