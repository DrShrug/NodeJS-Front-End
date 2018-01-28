<template>
  <div>
    <input type="button" value="Click" class="button" @click="show">
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      this.$modal.show('createTodo');
    },
  },
};
</script>

