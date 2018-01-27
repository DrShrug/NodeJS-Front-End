<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container box has-text-centered">
          <Second></Second>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Second from './SecondChild';

export default {
  name: 'Testing',
  components: {
    Second,
  },
};
</script>
