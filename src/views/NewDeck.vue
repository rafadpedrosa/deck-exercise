<template>
  <div class="new-deck">
    <CardsContainer>
      <slot slot="body">
        <!-- maybe this can be a component-->
        <div v-if="pile.length" class="card">
          <div
            v-for="(card, index) in pile"
            v-bind:key="index"
            class="card-img-container"
          >
            <img :src="card.image" alt="" />
          </div>
        </div>
      </slot>
      <slot slot="footer">
        <AddToPile @add="addToPile"></AddToPile>
      </slot>
    </CardsContainer>

    <div class="rotate-wrapper">
      <SubmitDeck @submitDeck="submitDeck"></SubmitDeck>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ADD_CREATED_DECK_TO_STORE } from "../store/actions";
import AddToPile from "../components/AddToPile";
import SubmitDeck from "../components/NewDeck/SubmitDeck";
import CardsContainer from "../components/CardsContainer";
import { SET_ALL_52_CARDS } from "../store/mutations";
import { mapGetters } from "vuex";

export default {
  components: {
    AddToPile,
    SubmitDeck,
    CardsContainer,
  },
  data() {
    return {
      pile: [],
    };
  },
  methods: {
    async resolveAllCardsApiProblem() {
      // since the API is not giving me all the cards from a deck I created one to store all possible (52) cards and use it in the Create new
      // I think you understood why I didi taht, but at the same time it might not be ok...Anyway I can explain why I did it if necessary.

      const { data: allCards } = await axios.get(
        "http://localhost:8080/allCards.json"
      );

      this.$store.commit(SET_ALL_52_CARDS, allCards);
    },
    addToPile(card) {
      const cardToAddPile = { ...this.all52Cards[card.toUpperCase()] };

      if (cardToAddPile) {
        this.pile.push(cardToAddPile);
      } else {
        console.warn("::: it did not exist");
      }
    },
    // I'm not a card person which cars is the less value? 2C?
    async submitDeck(rotation = "2C") {
      const pileCardsCode = this.pile.map((card) => card.code);
      const createResponse = await axios.get(
        `https://deckofcardsapi.com/api/deck/new?cards=${pileCardsCode.join(
          ","
        )}`
      );
      const deck = createResponse.data;

      await this.$store.dispatch(ADD_CREATED_DECK_TO_STORE, {
        ...deck,
        rotation: rotation,
      });

      this.$router.push({ path: `/deck/${deck.deck_id}` });
    },
  },
  computed: {
    ...mapGetters(["all52Cards"]),
  },
  mounted() {
    this.resolveAllCardsApiProblem();
  },
};
</script>

<style scoped>
/* duplicated, no time left */
.rotate-wrapper {
  padding-top: 10px;
  display: flex;
  justify-content: right;
}

.card-img-container img {
  height: 200px;
  padding: 5px;
}
</style>
