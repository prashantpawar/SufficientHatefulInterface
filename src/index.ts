import Vue from 'vue';
import App from './App.vue';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const app = new Vue({
  el: '#app',
  render: h => h(App)
});