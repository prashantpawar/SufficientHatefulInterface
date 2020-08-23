import Vue from 'vue';
import Vuex from 'vuex';
import { generateUUID } from '../utils';
import { getKey, setKey } from './bluzelle';
import { remove, update, findIndex, propEq, reject } from "ramda";

Vue.use(Vuex);

export interface Task {
  id: string,
  name: string,
  completed: boolean
}
export interface State {
  isConnecting: number,
  tasks: Task[]
}
const state: State = {
  isConnecting: 0,
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
    deleteCompletedTasks({ commit }, task) {
      commit('deleteCompletedTasks', task);
    },
    updateTask({ commit }, task) {
      commit('updateTask', task);
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
      _state.isConnecting++;
    }),
    connected: (async (_state: State, key) => {
      _state.isConnecting--;
    }),
    addTask: (async (_state: State, { text }) => {
      const task = {
        id: generateUUID(),
        name: text,
        completed: false
      } as Task;
      _state.tasks.push(task);
      await setKey(taskKeyName, JSON.stringify(_state.tasks));
      _state.isConnecting--;
    }),
    getTasks: (async (_state: State) => {
      _state.tasks = JSON.parse(await getKey(taskKeyName)) as Task[];
      _state.isConnecting--;
    }),
    deleteTask: (async (_state: State, task) => {
      _state.tasks = remove(findIndex(propEq('id', task.id), _state.tasks), 1, _state.tasks);
      await setKey(taskKeyName, JSON.stringify(_state.tasks));
      _state.isConnecting--;
    }),
    deleteCompletedTasks: (async (_state: State) => {
      console.log(_state.tasks);
      console.log(reject(propEq('completed', true), _state.tasks));
      // _state.tasks = reject(propEq('completed', true), _state.tasks);
      // await setKey(taskKeyName, JSON.stringify(_state.tasks));
      // _state.isConnecting--;
    }),
    updateTask: (async (_state: State, task) => {
      _state.tasks = update(findIndex(propEq('id', task.id), _state.tasks), task, _state.tasks);
      await setKey(taskKeyName, JSON.stringify(_state.tasks));
      _state.isConnecting--;
    })
  }
});