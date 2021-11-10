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
      <slot slot="footer" v-if="getRotationCardImage">
        <div class="rotate-card">
          <h3 class="pageTitle">Rotation Card</h3>
          <div v-if="selectedDeck" class="card">
            <div class="card-img-container">
              <img :src="getRotationCardImage" alt="" />
            </div>
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
    ...mapGetters(["all52Cards", "selectedDeck", "rotateCard"]),
    getRotationCardImage() {
      const rotationCardImage = this.all52Cards[this.rotateCard] || {
        image: "",
      };

      return rotationCardImage.image;
    },
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
  height: 150px;
  padding: 5px;
}

.rotate-card {
  display: flex;
  flex-direction: column;
}
</style>
