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

  fetchStats({commit}, token) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }
    return fetch(`${process.env.baseUrl}stats/`, {
      method: 'GET',
      headers,
    }).then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Ошибка: ${res.status}`);
      })
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
