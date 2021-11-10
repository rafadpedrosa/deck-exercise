import Vue from "vue";
import Vuex from "vuex";
import { ADD_CREATED_DECK_TO_STORE } from "./actions";
import { ADD_TO_ALL_DECKS, SET_SELECTED_DECK } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allDecks: {},
    selectedDeck: {},
  },
  mutations: {
    [SET_SELECTED_DECK](state, payload) {
      state.selectedDeck = payload;
    },
    [ADD_TO_ALL_DECKS](state, payload) {
      state.allDecks[payload.deck_id] = payload;
    },
  },
  actions: {
    [ADD_CREATED_DECK_TO_STORE]({ commit }, deck) {
      commit(ADD_TO_ALL_DECKS, deck);

      return deck;
    },
  },
  modules: {},
  getters: {
    selectedDeck: (state) => state.selectedDeck,
    selectedDeckCards: (state) => state.selectedDeck.cards,
  },
});
