<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
  name: 'FloatNav',
  components: {
  },
  setup () {
    const state: any = reactive({
      count: 0
    })

    return {
      ...toRefs(state),
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
