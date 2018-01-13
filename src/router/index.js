import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '@/components/TodoPage';
import Auth from '@/components/Auth/AuthPage';
import Overview from '@/components/Account/AccOverview';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/todo',
      name: 'Todo',
      component: TodoPage,
      meta: {
        title: 'Todo App - Task Manager',
      },
    },
    {
      path: '/',
      name: 'Auth',
      component: Auth,
      meta: {
        title: 'Authentification - Task Manager',
      },
    },
    {
      path: '/account/overview',
      name: 'Overview',
      component: Overview,
      meta: {
        title: 'Account Overview - Task Manager,',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
