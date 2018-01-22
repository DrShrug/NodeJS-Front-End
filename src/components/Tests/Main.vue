<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container box has-text-centered">
          <First></First>
          <Second></Second>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import First from './FirstChild';
import Second from './SecondChild';

export default {
  name: 'Testing',
  components: {
    First,
    Second,
  },
};
</script>
