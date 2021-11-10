<template>
  <div class="deck">
    <CardsContainer>
      <slot slot="body">
        <!-- maybe this can be a component-->
        <div v-if="selectedDeck" class="card">
          <div
            v-for="(card, index) in selectedDeck.cards"
            v-bind:key="index"
            class="card-img-container"
          >
            <img :src="card.image" alt="" />
          </div>
        </div>
      </slot>
    </CardsContainer>
    <SortCardsButtons
      @sortByInput="sortByInput"
      @sortByRotation="sortByRotation"
    ></SortCardsButtons>
  </div>
</template>

<script>
import axios from "axios";
import { SET_SELECTED_DECK } from "../store/mutations";
import { mapGetters } from "vuex";
import CardsContainer from "../components/CardsContainer";
import SortCardsButtons from "../components/Deck/SortCardsButtons";

export default {
  components: {
    SortCardsButtons,
    CardsContainer,
  },
  data() {
    return {
      deck_id: null,
    };
  },

  methods: {
    sortByInput() {
      // do the sort
    },
    sortByRotation() {
      // do the sort
    },
    drawCardsFromDeck() {
      // I'm getting always 10

      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.deck_id}/draw?count=10`
        )
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

<style>
/* duplicated, no time left */
.card-img-container img {
  height: 200px;
  padding: 5px;
}
</style>
