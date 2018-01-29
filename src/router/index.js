import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '@/components/TodoApp/TodoPage';
import Auth from '@/components/Auth/AuthPage';
import Overview from '@/components/Account/Overview/AccOverview';
import Test from '@/components/Tests/Main';
import Visuals from '@/components/Tests/Visuals';
import ChildTest from '@/components/Tests/Child';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'Testing',
      component: Test,
      meta: {
        title: 'Testing page',
      },
    },
    {
      path: '/child',
      name: 'Testing',
      component: ChildTest,
      meta: {
        title: 'Testing page',
      },
    },
    {
      path: '/visual',
      name: 'Testing',
      component: Visuals,
      meta: {
        title: 'Testing page',
      },
    },
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
