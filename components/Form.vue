<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Title">
      <b-form-input v-model="form.title" required />
    </b-form-group>
    <b-form-group label="Description">
      <b-form-textarea
        v-model="form.description"
        required
        rows="5"
        max-rows="10"
      />
    </b-form-group>
    <div class="d-flex justify-content-end">
      <NuxtLink class="mr-2" to="/">
        <b-button size="sm">Cancel</b-button>
      </NuxtLink>
      <b-button size="sm" type="submit" variant="primary">Submit</b-button>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

interface InitialData {
  title: string;
  description: string;
}

export default Vue.extend({
  props: {
    initialData: {
      type: Object as PropType<InitialData>,
      default: () => ({
        title: "",
        description: "",
      }),
    },
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
    };
  },
  mounted() {
    this.setFormData();
  },
  methods: {
    setFormData() {
      this.form = this.initialData;
    },
    onSubmit() {
      this.$emit("submit", this.form);
    },
  },
  watch: {
    initialData() {
      this.setFormData();
    },
  },
});
</script>
