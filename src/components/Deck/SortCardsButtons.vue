<template>
  <div class="sort-cards-buttons">
    <div class="title">Sort cards by</div>
    <div>
      <button
        data-test="sortByInput"
        class="primary-color"
        @click="$emit('sortByInput')"
      >
        Input Order
      </button>

      <button
        data-test="sortByRotation"
        class="primary-color"
        @click="$emit('sortByRotation')"
      >
        Rotation order
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.title {
  padding: 5px;
}

.sort-cards-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

input[type="text"] {
  border-radius: 4px;
}

button {
  width: 130px;
  height: 35px;
  border-radius: 2px;
  border: 1px solid #ccc;
}
</style>
