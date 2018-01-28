// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Notifications from 'vue-notification';
import VModal from 'vue-js-modal';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Notifications);
Vue.use(VModal, { componentName: 'modalComp' });
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
