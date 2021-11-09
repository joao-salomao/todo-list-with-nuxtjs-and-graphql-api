<template>
  <div>
    <h1>Add Task</h1>
    <Form @submit="onSubmit" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    async onSubmit(data: { title: string; description: string }) {
      await this.$axios.$post("/api/todo", data);
      this.$router.push("/");
    },
  },
});
</script>
