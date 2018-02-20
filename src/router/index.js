import Vue from 'vue';
import Router from 'vue-router';
import TodoPage from '@/components/TodoApp/TodoPage';
import Auth from '@/components/Auth/AuthPage';
import Test from '@/components/Tests/Main';
import Groups from '@/components/Group/GroupManagement/GroupList';
import GroupOverview from '@/components/Group/Overview/GroupOverview';
import AddMemberGroup from '@/components/Group/MemberManagement/AddMemberPage';
import RemoveMember from '@/components/Group/MemberManagement/RemoveMemberPage';
import Guide from '@/components/Guide/GuidePage';
import store from './../store';

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
      path: '/guide',
      name: 'Guide',
      component: Guide,
      meta: {
        title: 'Todo App - Guide',
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
      path: '/group/removeMember',
      name: 'RemoveMember',
      component: RemoveMember,
      meta: {
        title: 'Todo App - Remove Member',
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
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch('forceCloseSidemenu');
  document.title = to.meta.title;
  next();
});

export default router;
