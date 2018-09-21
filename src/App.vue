<template>
  <div id="app">
    <div class="container">
      <div class="filterDiv cars">⿕</div>
      <div class="filterDiv colors fruits">⿔</div>
      <div class="filterDiv cars">&#xE750;</div>
      <div class="filterDiv cars">⿕</div>
      <div class="filterDiv colors fruits">⿔</div>
      <div class="filterDiv cars">&#xE750;</div>
      <div class="filterDiv cars">⿕</div>
      <div class="filterDiv colors fruits">⿔</div>
      <div class="filterDiv cars">&#xE750;</div>
      <div class="filterDiv cars">⿕</div>
      <div class="filterDiv colors fruits">⿔</div>
      <div class="filterDiv cars">&#xE750;</div>
      <div class="filterDiv cars">⿕</div>
      <div class="filterDiv colors fruits">⿔</div>
      <div class="filterDiv cars">&#xE750;</div>
      <div class="filterDiv cars">⿕</div>
      <div class="filterDiv colors fruits">⿔</div>
      <div class="filterDiv cars">&#xE750;</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'japanese_radicals';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
    overflow: hidden;
}

.filterDiv {
    font-family: 'japanese_radicals';
    float: left;
    background-color: #2196F3;
    color: #ffffff;
    width: 100px;
    line-height: 100px;
    text-align: center;
    margin: 2px;
}

/* The "show" class is added to the filtered elements */
.show {
    display: block;
}

/* Style the buttons */
.btn {
  border: none;
  outline: none;
  padding: 12px 16px;
  background-color: #f1f1f1;
  cursor: pointer;
}

/* Add a light grey background on mouse-over */
.btn:hover {
  background-color: #ddd;
}

/* Add a dark background to the active button */
.btn.active {
  background-color: #666;
  color: white;
}
</style>
