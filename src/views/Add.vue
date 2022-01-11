<template>
  <div class="wrapper">
    <div class="add">
      <h1>Add</h1>{{msg}}
        <div class="most-used">
          <div class="most-used-buttons">
            <div class="most-used-buttons__inner">
                <AddButton v-for="favourite in favourites" :key="favourite.id" :buttonData="favourite" :labelTotal="10" v-on:clicked="handleClick"/>
            </div>
          </div>
        </div>
        <div class="crumbs">
          <div v-for="crumb in crumbs" :key="crumb.id">
            {{crumb.label}} -- {{crumb.amount}}
          </div>
        </div>
        <div class="crumbs" style="background: #ff9900">
          <div> hellup</div>
          <div v-for="crumb in filterCrumbs()" :key="crumb.label">
            'crumbs' {{crumb.label}} - {{crumb.amount}}
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
    msg: string;
    favourites: Array<ICrumb>,
    crumbs: Array<ICrumb>,
    bg: Array<ICrumb>
}

export default defineComponent({
  name: 'Add',
  components: {
    AddButton
  },
  props: {
    msg: String
  },
  setup () {
    const state: IState = reactive({
      msg: '',
      favourites: seedData,
      crumbs: store.getters['crumbStore/getAllCrumbs'],
      bg: store.getters['crumbStore/bl']
    })

    const handleClick = (el: ICrumb, ell: any) => {
      console.log('hier ook', el, ell)
      store.dispatch('crumbStore/addCrumb', el)
    }

    const filterCrumbs = () => {
      const filteredArray = state.crumbs.filter(function (el:ICrumb) {
        return el.label === 'tobacco'
      })

      return filteredArray
    }

    onMounted(() => {
      setTimeout(() => {
        store.dispatch('crumbStore/loadCrumbs')
      }, 2000)
    })

    return {
      ...toRefs(state),
      handleClick,
      filterCrumbs
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

.most-used-buttons {
  &__inner {
    padding: 2rem;
  }
}

</style>
