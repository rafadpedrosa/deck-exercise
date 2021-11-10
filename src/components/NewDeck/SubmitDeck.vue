<template>
  <div class="add-to-pile">
    <div>Rotation Card</div>
    <div>
      <input
        type="text"
        maxlength="2"
        placeholder="Card name"
        v-model="rotation"
      />
      <button class="primary-color" @click="$emit('submitDeck', rotation)">
        Submit Deck
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotation: "",
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-items: left;
}

.add-to-pile {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  border-radius: 4px;
}

button {
  width: 150px;
  margin-left: 25px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
