<template>
  <div class="deck">
    <h1>New Deck page</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    createNewDeck() {
      axios.get("https://deckofcardsapi.com/api/deck/new").then(console.log);
    },
  },
  mounted() {
    this.createNewDeck();
  },
};
</script>

<style></style>
