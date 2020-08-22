import Vue from 'vue';
import Vuex from 'vuex';
import { generateUUID } from '../utils';
import { getKey, setKey } from './bluzelle';
import { remove, findIndex, propEq } from "ramda";

Vue.use(Vuex);

interface Task {
  id: string,
  name: string,
  completed: boolean
}
export interface State {
  isConnecting: boolean,
  tasks: Task[]
}
const state: State = {
  isConnecting: false,
  tasks: [],
};

const taskKeyName = 'tasks';
export default new Vuex.Store({
  state,
  actions: {
    blzInitialized({ commit }) {
      commit('getTasks');
    },
    connecting({ commit }) {
      commit('connecting');
    },
    connected({ commit }) {
      commit('connected');
    },
    addTask({ commit }, text) {
      commit('addTask', text);
    },
    deleteTask({ commit }, task) {
      commit('deleteTask', task);
    },
  },
  mutations: {
    getKey: (async (_state: State, key) => await getKey(key)),
    setKey: (async (_state: State, payload) => {
      const { key, value } = payload;
      await setKey(key, JSON.stringify(value));
      return _state;
    }),
    connecting: (async (_state: State, key) => {
      _state.isConnecting = true;
    }),
    connected: (async (_state: State, key) => {
      _state.isConnecting = false;
    }),
    addTask: (async (_state: State, { text }) => {
      const task = {
        id: generateUUID(),
        name: text,
        completed: false
      } as Task;
      _state.tasks.push(task);
      await setKey(taskKeyName, JSON.stringify(_state.tasks));
    }),
    getTasks: (async (_state: State) => {
      _state.tasks = JSON.parse(await getKey(taskKeyName)) as Task[];
      _state.isConnecting = false;
    }),
    deleteTask: (async (_state: State, task) => {
      _state.tasks = remove(findIndex(propEq('id', task.id), _state.tasks), 1, _state.tasks);
      await setKey(taskKeyName, JSON.stringify(_state.tasks));
    })
  }
});