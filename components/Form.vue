<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Task title">
      <b-form-input v-model="form.title" required />
    </b-form-group>

    <b-form-group label="Task Description">
      <b-form-input v-model="form.description" required />
    </b-form-group>
    <div class="d-flex justify-content-end">
      <NuxtLink class="mr-2" to="/">
        <b-button size="sm">Cancel</b-button>
      </NuxtLink>
      <b-button size="sm" type="submit" variant="primary">Submit</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
