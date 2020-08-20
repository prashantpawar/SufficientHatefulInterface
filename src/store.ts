import Vue from 'vue';
import Vuex from 'vuex';
import { generateUUID } from './utils';

Vue.use(Vuex);

const state = {
  tasks: [
    {
      id: generateUUID(),
      name: 'Task 1',
      completed: true
    },
    {
      id: generateUUID(),
      name: 'Task 2',
      completed: false
    }
  ]
};

export default new Vuex.Store({
  state
});