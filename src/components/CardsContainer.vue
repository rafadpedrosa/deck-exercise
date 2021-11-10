<template>
  <div class="card-container">
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-container {
  background-color: #16644c;
  border-radius: 5px;
  height: 400px;
  padding: 20px;
  display: flex;
  justify-self: left;
  flex-direction: column;
}

.card-container div {
  display: flex;
  justify-items: left;
  flex-wrap: wrap;
}

.body {
  height: 90%;
  overflow: auto;
}

.footer {
  padding: 5px;
}
</style>
