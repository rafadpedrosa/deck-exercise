<template>
  <div class="deck">
    <h1>Deck page</h1>
    <p>Selected Deck:</p>
    <hr />
    {{ selectedDeck }}
  </div>
</template>

<script>
import axios from "axios";
import { SET_SELECTED_DECK } from "../store/mutations";
import { mapGetters } from "vuex";

export default {
  methods: {
    data() {
      return {
        deck_id: null,
        selectedDeck: null,
      };
    },
    drawCardsFromDeck() {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw?count=2`)
        .then(({ data }) => data)
        .then((deck) => this.$store.commit(SET_SELECTED_DECK, deck));
    },
  },
  computed: {
    ...mapGetters(["selectedDeck"]),
  },
  mounted() {
    this.deck_id = this.$route.params.id;
    this.drawCardsFromDeck();
  },
};
</script>

<style></style>
