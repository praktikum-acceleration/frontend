import {get} from '~/assets/js/rest';

export const state = () => ({
  notes: false,
  stats: {},
  isLoaded: true,
})

export const mutations = {
  setTableData(state, notes ) {
    state.notes = notes
  },
  stopLoading(state) {
    state.isLoaded = true
  }
}

export const actions = {

  fetchData(state) {
    return get('add_review/')
      .then(notes => {
        return state.commit('setTableData', notes)
      })
      .finally(res => {
        state.commit('stopLoading')
      })
  },
}

export const getters = {
  getNotes(state) {
    return state.notes
  }
}
