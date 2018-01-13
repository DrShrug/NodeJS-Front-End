<template>
  <div class="slider" :class="{ close: popupHide }">
    <article class="message" :class="popupClass">
      <div class="message-header">
        {{ popupHeader }}
      </div>
      <div class="message-body">
        {{ popupMessage }}
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    propsHide: Boolean,
    propsMessage: String,
    propsClass: String,
    propsHeader: String,
  },
  data() {
    return {
      popupHide: true,
      popupMessage: '',
      popupClass: '',
      popupHeader: '',
    };
  },
  watch: {
    propsHide(val) {
      this.popupHide = val;
    },
    propsMessage(val) {
      this.popupMessage = val;
    },
    propsClass(val) {
      this.popupClass = val;
    },
    propsHeader(val) {
      this.popupHeader = val;
    },
  },
};
</script>

<style>
.slider {
    position: fixed;
    width: 20vw;
    height: 13vh;
    bottom: 0;
    right: 0;
    overflow: hidden;
    transition: all 1s;
    margin: 10px;
    z-index: 1000;
  }

  .slider.close {
    bottom: 0vh;
    height: 0;
    transition: all 1s;
  }
</style>
