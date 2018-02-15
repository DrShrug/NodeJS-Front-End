<template>
  <div>
    <navbar></navbar>
    <sidemenu />
    <div>
      Filler content
    </div>
  </div>
</template>

<script>
import navbar from './../Navbar';

export default {
  components: {
    navbar,
  },
  name: 'Testing',
};
</script>
