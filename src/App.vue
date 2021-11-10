<template>
  <div id="app">
    <h1 class="pageTitle">Deck of cards</h1>
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  color: white;
}

body {
  background-color: #14795b;
  font-weight: bold;
}

.pageTitle {
  display: flex;
  justify-items: left;
  color: #efef5f;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0 10%;
}

input {
  height: 30px;
  border: 1px solid #3b3b3bff;
  padding: 0 10px;
}

button.primary-color,
input[type="button"].primary-color {
  color: white;
  cursor: pointer;
  background-color: #04a865;
  border: 1px solid #3b3b3bff;
}
</style>
