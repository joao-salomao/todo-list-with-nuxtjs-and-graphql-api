<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Todo</h1>
      <NuxtLink to="/add">
        <b-button variant="primary">Add Task</b-button>
      </NuxtLink>
    </div>
    <b-list-group>
      <b-list-group-item :key="item.id" v-for="item in todos">
        <h4>{{ item.title }}</h4>
        <div>{{ item.description }}</div>
        <div class="d-flex justify-content-end mt-2">
          <b-button size="sm" class="mr-2" @click="onClickEdit(item.id)"
            >Edit</b-button
          >
          <b-button size="sm" variant="danger" @click="onClickDelete(item.id)"
            >Delete</b-button
          >
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

interface Todo {
  id: string;
  title: string;
  description: string;
}

export default Vue.extend({
  fetchOnServer: true,
  data() {
    const todos: Todo[] = [];
    return { todos };
  },
  async fetch() {
    await this.getTodos();
  },
  methods: {
    async getTodos() {
      this.todos = await this.$axios.$get("/api/todo");
    },
    async onClickDelete(itemId: string) {
      await this.$axios.delete(`/api/todo/${itemId}`);
      this.todos = this.todos.filter((todo) => todo.id !== itemId);
    },
    onClickEdit(itemId: string) {
      this.$router.push({
        path: "/edit",
        query: {
          id: itemId,
        },
      });
    },
  },
});
</script>
