import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '@/components/TodoApp/TodoPage';
import Auth from '@/components/Auth/AuthPage';
import Overview from '@/components/Account/Overview/AccOverview';
import Test from '@/components/Tests/Main';
import Groups from '@/components/Group/GroupList';
import GroupOverview from '@/components/Group/GroupOverview';
import AddMemberGroup from '@/components/Group/AddMemberPage';

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
      path: '/group/overview',
      name: 'GroupOverview',
      component: GroupOverview,
      meta: {
        title: 'Todo App - Group Overview',
      },
    },
    {
      path: '/group/addMember',
      name: 'AddMember',
      component: AddMemberGroup,
      meta: {
        title: 'Todo App - Add Member',
      },
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups,
      meta: {
        title: 'Todo App - Group Selection',
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
