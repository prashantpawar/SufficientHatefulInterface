<template>
  <section class='todoapp'>
    <header class='header'>
      <h2>{{$store.state.isConnecting}} tx pending</h2>
      <h1>
        todos
        <span class='status-indicator'>
          <img
            v-if='$store.state.isConnecting === 0'
            src='img/icons/noun_integration_427492.png'
            height='35px'
          />
          <img
            v-if='$store.state.isConnecting > 0'
            class='spinner'
            src='img/icons/noun_Sync_427570.png'
            height='35px'
          />
        </span>
      </h1>
      <input
        class='new-todo'
        placeholder='What needs to be done?'
        autofocus
        autocomplete='off'
        @keyup.enter='addTask'
      />
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class='main'>
      <input id='toggle-all' class='toggle-all' type='checkbox' />
      <label for='toggle-all'>Mark all as complete</label>
      <ul class='todo-list'>
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li
          class='completed'
          v-if='displayCompleted'
          v-for='task in completed($store.state.tasks)'
          :key='task.id'
        >
          <div class='view'>
            <input
              class='toggle'
              id='task.id'
              type='checkbox'
              v-on:click='toggle(task)'
              v-model='task.completed'
            />
            <label :for='task.id'>{{task.name}}</label>
            <button class='destroy' v-on:click='deleteTask(task)'></button>
          </div>
          <input class='edit' value='Create a TodoMVC template' />
        </li>
        <li v-if='displayTodo' v-for='task in todo($store.state.tasks)' :key='task.id'>
          <div class='view'>
            <input
              class='toggle'
              type='checkbox'
              v-on:click='toggle(task)'
              v-model='task.completed'
            />
            <label :for='task.id'>{{task.name}}</label>
            <button class='destroy' v-on:click='deleteTask(task)'></button>
          </div>
          <input class='edit' value='Rule the web' />
        </li>
      </ul>
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class='footer'>
      <!-- This should be `0 items left` by default -->
      <span class='todo-count'>
        <strong>{{todo($store.state.tasks).length}}</strong> item left
      </span>
      <!-- Remove this if you don't implement routing -->
      <ul class='filters'>
        <li>
          <a
            v-bind:class='{ selected: displayTodo && displayCompleted }'
            href='#/'
            v-on:click='showAll()'
          >All</a>
        </li>
        <li>
          <a
            href='#'
            v-bind:class='{ selected: !displayCompleted }'
            v-on:click='showOnlyTodo()'
          >Active</a>
        </li>
        <li>
          <a
            href='#'
            v-bind:class='{ selected: !displayTodo }'
            v-on:click='showOnlyCompleted()'
          >Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class='clear-completed' v-on:click='deleteCompletedTasks()'>Clear completed</button>
    </footer>
  </section>
</template>
<script>
import { set, filter } from "ramda";
import { mapActions } from "vuex";
import store from "./store/store";

const COMPLETED = "COMPLETED";
const TODO = "TODO";
const isCompleted = (task) => task.completed;
const notCompleted = (task) => !task.completed;
export default {
  name: "Todo",
  data() {
    return {
      displayCompleted: true,
      displayTodo: true,
    };
  },
  methods: {
    completed: filter(isCompleted),
    todo: filter(notCompleted),
    showAll() {
      this.displayCompleted = true;
      this.displayTodo = true;
    },
    showOnlyTodo() {
      this.displayCompleted = false;
      this.displayTodo = true;
    },
    showOnlyCompleted() {
      this.displayCompleted = true;
      this.displayTodo = false;
    },
    toggle(task) {
      this.$store.dispatch("connecting");
      task = { ...task, completed: true };
      this.$store.dispatch("updateTask", task);
      return task;
    },
    addTask(e) {
      const text = e.target.value.trim();
      if (text) {
        this.$store.dispatch("connecting");
        this.$store.dispatch("addTask", {
          text,
        });
        e.target.value = "";
      }
    },
    deleteTask(task) {
      this.$store.dispatch("connecting");
      this.$store.dispatch("deleteTask", task);
    },
    deleteCompletedTasks() {
      this.$store.dispatch("connecting");
      this.$store.dispatch("deleteCompletedTasks");
    },
  },
};
</script>