<template>
  <div>
    <p>message: {{ $t('hello') }}</p>
  </div>
</template>



<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}
</i18n>
<script>
export default {
  name: 'app',
};
</script>