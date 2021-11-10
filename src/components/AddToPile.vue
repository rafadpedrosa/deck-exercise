<template>
  <div class="add-to-pile">
    <div>Add cards to the pile</div>
    <div>
      <input
        type="text"
        v-model="value"
        maxlength="2"
        @keyup.enter="emitValue"
      />
      <button class="primary-color" @click="emitValue">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    emitValue() {
      this.$emit("add", this.value);
    },
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
  border-radius: 4px 0 0 4px;
}

button {
  border-radius: 0 4px 4px 0;
}
</style>
