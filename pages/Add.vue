<template>
  <b-card class="m-3">
    <Form @submit="onSubmit" />
  </b-card>
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
