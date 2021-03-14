export const state = () => ({
  visible: false,
  replyForm: false,
  title: '',
  subtitle: '',
});

export const mutations = {
   openPopup(state, {title,subtitle,replyForm}) {
    state.visible = true;
    state.title = title;
    state.subtitle = subtitle;
    state.replyForm = replyForm;
  },
  closePopup(state) {
    state.visible = false;
  },
};

export const actions = {
   openReplyFormPopup({ commit, state }, {title}) {
     commit('openPopup', {title,replyForm: true});
  },
  openTextPopup({ commit, state }, {title,subtitle}) {
    commit('openPopup', {title,subtitle,replyForm: false});
  },

  closePopup({ commit, state }) {
    commit('closePopup');
  },
}
