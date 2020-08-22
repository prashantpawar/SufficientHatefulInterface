<template>
  <section class='todoapp'>
    <header class='header'>
      <h1>
        todos
        <span class='status-indicator'>
          <img
            v-if='!$store.state.isConnecting'
            src='img/icons/noun_integration_427492.png'
            height='35px'
          />
          <img
            v-if='$store.state.isConnecting'
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
        <li class='completed' v-for='task in completed($store.state.tasks)' :key='task.id'>
          <div class='view'>
            <input class='toggle' id='task.id' type='checkbox' v-model='task.completed' />
            <label :for='task.id'>{{task.name}}</label>
            <button class='destroy' v-on:click='deleteTask(task)'></button>
          </div>
          <input class='edit' value='Create a TodoMVC template' />
        </li>
        <li v-for='task in todo($store.state.tasks)' :key='task.id'>
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
        <strong>0</strong> item left
      </span>
      <!-- Remove this if you don't implement routing -->
      <ul class='filters'>
        <li>
          <a class='selected' href='#/'>All</a>
        </li>
        <li>
          <a href='#/active'>Active</a>
        </li>
        <li>
          <a href='#/completed'>Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class='clear-completed'>Clear completed</button>
    </footer>
  </section>
</template>
<script>
import { set, filter } from "ramda";
import { mapActions } from "vuex";

const COMPLETED = "COMPLETED";
const TODO = "TODO";
const isCompleted = (task) => task.completed;
const notCompleted = (task) => !task.completed;
export default {
  name: "Todo",
  methods: {
    completed: filter(isCompleted), // tasks => tasks.filter(task => task.status),
    todo: filter(notCompleted),
    toggle: (task) => set("status", status ? false : true),
    addTask(e) {
      const text = e.target.value.trim();
      if (text) {
        this.$store.dispatch("connecting");
        this.$store.dispatch("addTask", {
          text,
        });
        this.$store.dispatch("connected");
        e.target.value = "";
      }
    },
    deleteTask(task) {
      this.$store.dispatch("deleteTask", task);
    },
  },
};
</script>