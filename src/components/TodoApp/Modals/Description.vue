<template>
  <modalComp height="auto" name="description" @before-open="setDesc">
    <div class="box">
      <p style="white-space: pre-wrap">{{ desc }}</p>
    </div>
  </modalComp>
</template>

<script>
export default {
  data() {
    return {
      desc: '',
    };
  },
  methods: {
    setDesc(event) {
      this.desc = event.params.desc;
    },
  },
};
</script>
