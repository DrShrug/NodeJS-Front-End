<template>
  <div class="level-item has-text-centered">
    <div class="icon-spacing">
      <span class="icon is-large icon-spacing">
        <i class="fa fa-3x" :class="icon" aria-hidden="true"></i>
      </span>
    </div>
    <div>
      <p class="heading">{{ type }}</p>
      <p class="title">{{ data }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['type', 'data', 'icon'],
};
</script>

<style>
.icon-spacing {
  margin-right: 5px;
}
</style>

