export const index = () => ({
  user: {},
  menu: false
})

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  toggleMenu(state, bool) {
    state.menu = bool;
  },
}
