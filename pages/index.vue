<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Todo List</h1>
      <NuxtLink to="/add">
        <b-button>Add Task</b-button>
      </NuxtLink>
    </div>
    <b-list-group>
      <b-list-group-item :key="item.id" v-for="item in todos">
        <h4>{{ item.title }}</h4>
        <div>{{ item.description }}</div>
        <div class="d-flex justify-content-end mt-2">
          <b-button size="sm" class="mr-2">Edit</b-button>
          <b-button size="sm" variant="danger">Delete</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  fetchOnServer: true,
  data() {
    return {
      todos: <any>[],
    };
  },
  async fetch() {
    await this.getTodos();
  },
  methods: {
    async getTodos() {
      this.todos = await this.$axios.$get("/api/todo");
    },
  },
});
</script>
