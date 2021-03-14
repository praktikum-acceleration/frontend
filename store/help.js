import {get, post} from '~/assets/js/rest';

export const state = () => ({
  needHelp: false,
})

export const mutations = {
  setNeedHelp(state, type ) {
    state.needHelp = type
  },
  stopLoading(state) {
    state.isLoaded = true
  }
}

export const actions = {
  askHelp(state) {
    return state.getters.getNeedHelp ? '' : post('help-me/')
      .then(res => {
        state.commit('setNeedHelp', true)
      })
  },

  getNeedHelp(state) {
    return get('help-me/')

      .then(res => {
        console.log(res,'getNeedHelp')
        return state.commit('setNeedHelp', res.is_need_help)
      })
  },
}

export const getters = {
  // getNotes(state) {
  //   return state.notes
  // },
  getNeedHelp(state) {
    return state.needHelp
  }
}
