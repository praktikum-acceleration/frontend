export const state = () => ({
  visible: false,
  isShare: false,
  isQuiz: false,
  isForm: false,
  isHaveClose: true,
  isError: false,
  isLoading: false,
});

export const mutations = {
   openPopup(state, reply) {
    state.visible = true;
    state.reply = reply
  },
  closePopup(state) {
    state.visible = false;
  },
};

export const actions = {
   openPopup({ commit, state }, reply) {
     commit('openPopup', state, reply);
  },
}
