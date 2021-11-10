<template>
  <div class="new-deck">
    <h1>New Deck page</h1>
  </div>
</template>

<script>
import axios from "axios";
import { ADD_CREATED_DECK_TO_STORE } from "../store/actions";

export default {
  methods: {
    data() {
      return {
        selectedDeck: null,
      };
    },
    createNewDeck() {
      axios
        .get("https://deckofcardsapi.com/api/deck/new")
        .then(({ data }) => data)
        .then((deck) => this.$store.dispatch(ADD_CREATED_DECK_TO_STORE, deck))
        .then((selectedDeck) => (this.selectedDeck = selectedDeck));
    },
  },
  mounted() {
    this.createNewDeck();
  },
};
</script>

<style></style>
