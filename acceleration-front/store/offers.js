import { getProducts } from '@/assets/request/request'

export const state = () => ({
  offers: [],
});

export const mutations = {
  setState(state, { name, value }) {
    return (state[name] = value);
  },
};

export const actions = {
  async fetchOffers({ commit }) {

    const blocks = await getProducts();
    console.log(blocks)
    commit('setState', {
      name: 'offers',
      value: blocks,
    });
  },
};

export const getters = {
  getOffers(state) {
    return state.offers;
  },
};
