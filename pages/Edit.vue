<template>
  <div>
    <h1>Edit Task</h1>
    <Form v-if="!isLoading" @submit="onSubmit" :initialData="initialData" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

interface Todo {
  title: string;
  description: string;
}

export default Vue.extend({
  data() {
    return {
      isLoading: false,
      itemId: this.$route.query.id,
      initialData: {
        title: "",
        description: "",
      },
    };
  },
  mounted() {
    this.getTodo();
  },
  methods: {
    async getTodo() {
      this.isLoading = true;

      try {
        const resp = await this.$axios.$get<{ item: Todo }>(
          `/api/todo/${this.itemId}`
        );

        this.initialData = resp.item;
      } catch (e) {
        console.error(e);
        this.$router.push("/");
      }

      this.isLoading = false;
    },
    async onSubmit(data: { title: string; description: string }) {
      await this.$axios.$put(`/api/todo/${this.itemId}`, data);
      this.$router.push("/");
    },
  },
});
</script>
