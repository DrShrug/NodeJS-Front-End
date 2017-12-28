import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '@/components/TodoPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: TodoPage,
    },
  ],
});
