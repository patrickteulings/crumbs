import { Crumb } from '@/types/Crumb'
import { db } from '@/config/firebaseConfigTypeScript'
import { reactive } from 'vue'
import { getDoc, getDocs, setDoc, addDoc, collection, QueryDocumentSnapshot, DocumentSnapshot, DocumentReference } from 'firebase/firestore'
import { Context } from 'mocha'
import { ActionContext } from 'vuex'
import { CrumbTemplate } from '@/types/CrumbTemplate'

const SET_CURRENT_CRUMB = 'SET_CURRENT_CRUMB'
const ADD_CRUMB = 'ADD_CRUMB'
const ADD_INITIAL_CRUMBS = 'ADD_INITIAL_CRUMBS'
const ADD_INITIAL_CRUMBTEMPLATES = 'ADD_INITIAL_CRUMBTEMPLATES'

export const CrumbStore = {
  namespaced: true,
  state: reactive({
    crumb: null,
    crumbs: [],
    crumbTemplates: []
  }),

  mutations: {
    SET_CURRENT_CRUMB: (state: any, crumb: Crumb): void => {
      state.crumb = crumb
    },
    ADD_CRUMB: (state: any, crumb: Crumb): void => {
      state.crumbs.push(crumb)
    },
    ADD_INITIAL_CRUMBS: (state: any, crumb: Crumb): void => {
      crumb.date = (crumb.date !== undefined) ? crumb.date.toDate() : new Date()
      state.crumbs.push(crumb)
    },
    ADD_INITIAL_CRUMBTEMPLATES: (state: any, crumbTemplate: Crumb): void => {
      state.crumbTemplates.push(crumbTemplate)
    }
  },

  actions: {
    setCurrentCrumb: (context: any, crumb: Crumb): void => {
      context.commit(SET_CURRENT_CRUMB, crumb)
    },

    // ADD CRUMB TO DATABASE
    async addCrumb ({ commit, rootState }: ActionContext<any, any>, crumbPayload: Crumb): Promise<void> {
      const userID = (rootState.userStore.user.uid !== undefined) ? rootState.userStore.user.uid : ''

      const docRef: DocumentReference = await addDoc(collection(db, 'users', userID, 'crumbs'), crumbPayload)
      const doc: DocumentSnapshot = await getDoc(docRef)

      // SAVE THE FIRABSE-ID INSIDE THE CRUMB OBJECT FOR EASY REFERENCE
      const crumb: Crumb = doc.data() as Crumb
      crumb.id = doc.id
      crumb.date = crumb.date.toDate()

      commit(ADD_CRUMB, crumb)
      commit(SET_CURRENT_CRUMB, crumb)

      setDoc(docRef, { crumb }, { merge: true })
    },

    // LOADS ALL CRUMBS

    loadCrumbs: (context: ActionContext<any, any>): void => {
      const userID = (context.rootState.userStore.user.uid !== undefined) ? context.rootState.userStore.user.uid : ''
      getDocs(collection(db, 'users', userID, 'crumbs')).then((result) => {
        result.forEach((doc: QueryDocumentSnapshot) => {
          const el = doc.data()
          console.log(el.label)
          context.commit(ADD_INITIAL_CRUMBS, doc.data())
        })
      })
    },

    loadCrumbTemplates: (context: ActionContext<any, any>): void => {
      const userID = (context.rootState.userStore.user.uid !== undefined) ? context.rootState.userStore.user.uid : ''
      getDocs(collection(db, 'users', userID, 'crumbTemplates')).then((result) => {
        result.forEach((doc: QueryDocumentSnapshot) => {
          const crumbTemplate = doc.data()
          crumbTemplate.id = doc.id
          context.commit(ADD_INITIAL_CRUMBTEMPLATES, crumbTemplate)
        })
      })
    }

  },
  getters: {
    getCrumb: (state: Context): Crumb => state.crumb,
    getAllCrumbs: (state: any): Array<Crumb> => state.crumbs,
    getCrumbTemplates: (state: any) : Array<Crumb> => state.crumbTemplates,
    getCrumbTemplateByID: (state: any) => (id: string): CrumbTemplate => state.crumbTemplates.find((item: CrumbTemplate) => item.id === id)
  }
}

// const converter = {
//   toFirestore: (data: Crumb) => data,
//   fromFirestore: (snap: QueryDocumentSnapshot) =>
//     snap.data() as Crumb
// }
