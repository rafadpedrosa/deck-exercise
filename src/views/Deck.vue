<template>
  <div class="deck">
    <CardsContainer>
      <slot slot="body">
        <!-- maybe this can be a component-->
        <div v-if="sortedCards" class="card">
          <div
            v-for="(card, index) in sortedCards"
            v-bind:key="index"
            class="card-img-container"
          >
            <img :src="card.image" alt="" />
          </div>
        </div>
      </slot>
      <slot slot="footer" v-if="rotateCard">
        <div class="rotate-card">
          <h3 class="pageTitle">Rotation Card</h3>
          <div class="card">
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
import { SET_ALL_52_CARDS, SET_SELECTED_DECK } from "../store/mutations";
import { mapGetters } from "vuex";
import CardsContainer from "../components/CardsContainer";
import SortCardsButtons from "../components/Deck/SortCardsButtons";
import { sortSuits, sortSuitsByRotation } from "../utils/sortDecks";

export default {
  components: {
    SortCardsButtons,
    CardsContainer,
  },
  data() {
    return {
      deck_id: null,
      sortedCards: null,
    };
  },
  watch: {
    selectedDeck() {
      // input order is the input order of a normal deck or it is the order that I added in the new?
      this.sortedCards = this.selectedDeck.cards;
    },
  },
  methods: {
    sortByInput() {
      this.sortedCards = sortSuits(this.selectedDeck.cards);
    },
    sortByRotation() {
      this.sortedCards = sortSuitsByRotation(
        this.selectedDeck.cards,
        this.all52Cards[this.rotateCard]
      );
      // do the sort
      console.log(":::sortByRotation");
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
    async resolveAllCardsApiProblem() {
      // since the API is not giving me all the cards from a deck I created one to store all possible (52) cards and use it in the Create new
      // I think you understood why I didi taht, but at the same time it might not be ok...Anyway I can explain why I did it if necessary.

      const { data: allCards } = await axios.get(
        "http://localhost:8080/allCards.json"
      );

      this.$store.commit(SET_ALL_52_CARDS, allCards);
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
    this.resolveAllCardsApiProblem();
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
