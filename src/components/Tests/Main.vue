<template>
  <div>
    <navbar></navbar>
    <sidemenu />
    <div>test</div>
  </div>
</template>

<script>
import navbar from './../Navbar';

export default {
  components: {
    navbar,
  },
  name: 'Testing',
  data() {
    return {
      newCategoryName: '',
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('createCategory');
    },
  },
};
</script>
