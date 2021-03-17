import {get} from '~/assets/js/rest';

export const state = () => ({
  offers: {},
  myOffers: {},
  stats: {},
  isLoaded: false,
});

export const mutations = {
  setOffers(state, {offers}) {
    state.offers = offers;
    const myOffers = {};
    Object.keys(offers).forEach(id => {
      if (offers[id]?.editable === 'True') {
        myOffers[id] = offers[id];
      }
    });
    state.myOffers = myOffers;
  },
  setStats(state, {offers}) {
    state.stats = offers;
    console.log(state.stats);
  },
  stopLoading(state) {
    state.isLoaded = true;
  },
};

export const actions = {
  fetchOffers(state) {
    if(window.localStorage.getItem('token')) {
      return get('comments/').then(offers => {
          return state.commit('setOffers', {
            offers,
          });
        })
        .finally(res => {
          state.commit('stopLoading');
        });
    }
  },

  fetchStats({commit}) {
    return get('stats/',)
      .then(offers => {
        return commit('setStats', {
          offers,
        });
      })
      .finally(res => {
        commit('stopLoading');
      });
  },
};

export const getters = {
  getOffers(state) {
    return state.offers;
  },
};
