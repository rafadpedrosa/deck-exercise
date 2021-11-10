import Vue from "vue";
import Vuex from "vuex";
import { ADD_CREATED_DECK_TO_STORE } from "./actions";
import {
  ADD_TO_ALL_DECKS,
  SET_ALL_52_CARDS,
  SET_SELECTED_DECK,
  SET_SELECTED_ROTATE_VALUE,
} from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    all52Cards: {},
    allDecks: {},
    selectedDeck: {},
    selectedRotatedValue: null,
  },
  mutations: {
    [SET_SELECTED_ROTATE_VALUE](state, payload) {
      state.selectedRotatedValue = payload;
    },
    [SET_SELECTED_DECK](state, payload) {
      state.selectedDeck = payload;
    },
    [SET_ALL_52_CARDS](state, payload) {
      state.all52Cards = payload;
    },
    [ADD_TO_ALL_DECKS](state, payload) {
      state.allDecks[payload.deck_id] = payload;
    },
  },
  actions: {
    [ADD_CREATED_DECK_TO_STORE]({ commit }, deck) {
      commit(ADD_TO_ALL_DECKS, deck);
      commit(SET_SELECTED_ROTATE_VALUE, deck.rotation);
    },
  },
  modules: {},
  getters: {
    selectedDeck: (state) => state.selectedDeck,
    selectedDeckCards: (state) => state.selectedDeck.cards,
    all52Cards: (state) => state.all52Cards,
    rotateCard: (state) => state.selectedRotatedValue,
  },
});
