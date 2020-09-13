<template>
  <div id="app">
    <Navbar />

    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import "https://fonts.googleapis.com/icon?family=Material+Icons";
</style>

<style>
#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0%;
}
#content {
  flex-grow: 1;
  display: flex;
  overflow: auto;
}
body {
  margin: 0;
  font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
  font-size: 14px;
  background-color: #e9ebee;
}
</style>
