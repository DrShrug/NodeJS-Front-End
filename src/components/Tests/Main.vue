<template>
  <div>
    <navbar></navbar>
    <sidemenu />
    <button class="button" @click="emit">Click</button>
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
    emit() {
      this.$socket.emit('test', { data: 'Yes' });
    },
  },
  sockets: {
    connect() {
      alert('connected to server');
    },
    new(data) {
      alert(data.data);
    },
  },
};
</script>
