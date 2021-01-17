export const state = () => ({
  dropDownOpened: false
})

export const mutations = {
  closeDropDown(state) {
    state.dropDownOpened = false;
    console.log(state.dropDownOpened)
  },
  openDropDown(state) {
    state.dropDownOpened = true;
  },
}

export const actions = {
  closeDropDown({ commit }) {
    commit('closeDropDown')
  },
  openDropDown({ commit }) {
    commit('openDropDown')
  },
}
