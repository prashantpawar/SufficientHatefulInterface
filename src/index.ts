import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import { initBlz } from './store/bluzelle';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import './assets/css/style.css';

export const app = new Vue({
  el: '#app',
  render: h => h(App),
  store,
  created: () => {
    initBlz(store);
    window.addEventListener('beforeunload', (e) => {
      if (store.state.isConnecting !== 0) {
        e.preventDefault();
      }
    });
  }
});