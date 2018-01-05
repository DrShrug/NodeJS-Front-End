import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '@/components/TodoPage';
import Auth from '@/components/Authentification';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/todo',
      name: 'Todo',
      component: TodoPage,
    },
    {
      path: '/',
      name: 'Auth',
      component: Auth,
    },
  ],
});
