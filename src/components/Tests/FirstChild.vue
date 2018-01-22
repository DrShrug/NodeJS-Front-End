<template>
  <div class="box">
    <div :key="project.id" v-for="project in projects">
      <p>{{project.id}} - {{project.name}} : {{project.isCompleted}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState([
    'projects',
  ]),
  mounted() {
    this.$store.dispatch('loadProjects');
  },
};
</script>
