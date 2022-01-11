import { createStore } from 'vuex'
import { UserStore } from './/UserStore'
import { CrumbStore } from './/CrumbStore'
// import { GratitudeStore } from '@/store/GratitudeStore.ts'
// import { MoodStore } from '@/store/MoodStore.ts'
// import { HabitStore } from '@/store/HabitStore.ts'

export default createStore({
  state: {
    user: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore: UserStore,
    crumbStore: CrumbStore
    // gratitudeStore: GratitudeStore,
    // moodStore: MoodStore,
    // habitStore: HabitStore
  }
})
