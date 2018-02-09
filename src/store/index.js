import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import router from '@/router';

/* eslint-disable no-param-reassign */
/* eslint no-underscore-dangle: 0 */
/*
  Currently getting changes from API after every request
  Think of implementing a pooling system
*/

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    todos: [],
    categories: [],
    groups: [],
    users: [],
    openSideMenu: false,
    language: 'en',
    userDetails: null,
    userLoggedIn: {
      username: null,
      displayName: null,
      email: null,
      selectedGroup: null,
      hideCompleted: false,
      isLoggedIn: false,
      token: null,
    },
  },
  actions: {
    userLogin({ commit }, { email, password }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/users/login`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          email,
          password,
        },
      }).then((res) => {
        commit('loginSuccess', {
          email: res.data.email,
          username: res.data.username,
          displayName: res.data.displayName,
          token: res.headers['x-auth'],
        });
        return res;
      });
    },
    userSignup({ commit }, { email, password, username, displayName }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/users`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          email,
          password,
          username,
          displayName,
        },
      }).then((res) => {
        commit('loginSuccess', {
          email: res.data.email,
          username: res.data.username,
          displayName: res.data.displayName,
          token: res.headers['x-auth'],
        });
      });
    },
    userLogout({ commit }) {
      return axios.delete(`${process.env.API_URL}/users/me/logout`, {
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((res) => {
        commit('logoutSuccess');
        return res;
      });
    },
    createGroup({ commit }, { groupName }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/groups`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': store.getters.getToken,
        },
        data: {
          groupName,
        },
      }).then((res) => {
        console.log(res.data);
        commit('addGroup', res.data);
        return res;
      });
    },
    getGroups({ commit }) {
      return axios.get(`${process.env.API_URL}/groups`, {
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((res) => {
        console.log(res.data);
        commit('setGroups', { groups: res.data });
        return res;
      });
    },
    setGroup({ commit }, { groupId }) {
      commit('currentlySelectedGroup', { groupId });
    },
    deleteTodo({ commit, dispatch }, toDelete) {
      return axios({
        method: 'DELETE',
        url: `${process.env.API_URL}/todos/${toDelete}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((res) => {
        dispatch('loadTodosFromAPI');
        return res;
      });
    },
    deleteCategory({ commit, dispatch }, toDelete) {
      return axios({
        method: 'DELETE',
        url: `${process.env.API_URL}/${store.getters.getSelectedGroup}/categories/${toDelete}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((res) => {
        dispatch('loadCategoriesFromAPI');
        return res;
      });
    },
    loadCategoriesFromAPI({ commit }) {
      return axios.get(`${process.env.API_URL}/${store.getters.getSelectedGroup}/categories`, {
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((res) => {
        commit('setCategoryList', { categoriesData: res.data.categories });
        return res;
      }).catch((e) => {
        if (e.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    loadTodosFromAPI({ commit }) {
      return axios.get(`${process.env.API_URL}/${store.getters.getSelectedGroup}/todos`, {
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((response) => {
        commit('setTodoList', { todosData: response.data.todos });
        return response;
      }).catch((e) => {
        if (e.response.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    loadUsersFromAPI({ commit }) {
      return axios.get(`${process.env.API_URL}/users`, {
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((response) => {
        commit('setUserList', { usersData: response.data.users });
        return response;
      }).catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    newCategory({ commit, dispatch }, { categoryName }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/${store.getters.getSelectedGroup}/categories`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': store.getters.getToken,
        },
        data: {
          categoryName,
        },
      }).then((res) => {
        dispatch('loadCategoriesFromAPI');
        return res;
      });
    },
    newTodo({ commit, dispatch }, { task, completeByTime, categoryId }) {
      axios({
        method: 'POST',
        url: `${process.env.API_URL}/${store.getters.getSelectedGroup}/${categoryId}/todos`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': store.getters.getToken,
        },
        data: {
          task,
          completeByTime,
        },
      }).then((res) => {
        dispatch('loadTodosFromAPI');
        return res;
      });
    },
    modifyTodo({ commit, dispatch }, todoChanges) {
      return axios({
        method: 'PATCH',
        url: `${process.env.API_URL}/todos/${todoChanges.todoId}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
          'x-auth': store.getters.getToken,
        },
        data: {
          task: todoChanges.task,
          isCompleted: todoChanges.isCompleted,
          completeByTime: todoChanges.completeByTime,
        },
      }).then(res => res);
    },
    addMemberToGroup({ commit, dispatch }, { memberId }) {
      return axios({
        method: 'PATCH',
        url: `${process.env.API_URL}/groups/addmember/${store.getters.getSelectedGroup}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
          'x-auth': store.getters.getToken,
        },
        data: {
          userIdToAdd: memberId,
        },
      }).then((res) => {
        dispatch('loadUsersFromAPI');
        dispatch('getGroups');
        return res;
      });
    },
    switchCompletedVisiblity({ commit }) {
      commit('switchCompletedVisiblity');
    },
    switchLanguage({ commit }, lang) {
      commit('switchLanguage', lang);
    },
    openSideMenu({ commit }) {
      commit('toggleSideMenu');
    },
  },
  mutations: {
    toggleSideMenu(state) {
      state.openSideMenu = !state.openSideMenu;
    },
    switchCompletedVisiblity(state) {
      state.userLoggedIn.hideCompleted = !state.userLoggedIn.hideCompleted;
    },
    switchLanguage(state, lang) {
      state.language = lang;
    },
    addGroup(state, { group }) {
      state.groups.push(group);
    },
    currentlySelectedGroup(state, { groupId }) {
      state.userLoggedIn.selectedGroup = groupId;
    },
    setGroups(state, { groups }) {
      state.groups = [];
      groups.forEach(group => state.groups.push(group));
    },
    setTodoList(state, { todosData }) {
      state.todos = [];
      todosData.forEach(todo => state.todos.push(todo));
    },
    setUserList(state, { usersData }) {
      state.users = [];
      usersData.forEach(user => state.users.push(user));
    },
    setUserDetails(state, { userData }) {
      state.userDetails = userData;
    },
    setCategoryList(state, { categoriesData }) {
      state.categories = [];
      categoriesData.forEach(category => state.categories.push(category));
    },
    loginSuccess(state, userData) {
      state.userLoggedIn.token = userData.token;
      state.userLoggedIn.username = userData.username;
      state.userLoggedIn.email = userData.email;
      state.userLoggedIn.displayName = userData.displayName;
      state.userLoggedIn.isLoggedIn = true;
    },
    logoutSuccess(state) {
      state.todos = [];
      state.categories = [];
      state.groups = [];
      state.userDetails = null;
      state.userLoggedIn.hideCompleted = false;
      state.userLoggedIn.isLoggedIn = false;
      state.userLoggedIn.username = null;
      state.userLoggedIn.displayName = null;
      state.userLoggedIn.email = null;
      state.userLoggedIn.selectedGroup = null;
    },
  },
  getters: {
    openProjects: state => state.projects.filter(project => !project.isCompleted),
    isLoggedIn: state => state.userLoggedIn.isLoggedIn && state.userLoggedIn.token !== null,
    allTodos: state => state.todos,
    allCategories: state => state.categories,
    hideCompleted: state => state.userLoggedIn.hideCompleted,
    getUsers: state => state.users,
    getEmail: state => state.userLoggedIn.email,
    getUsername: state => state.userLoggedIn.username,
    getDisplayName: state => state.userLoggedIn.displayName,
    getToken: state => state.userLoggedIn.token,
    getUserDetails: state => state.userDetails,
    getLanguage: state => state.language,
    getGroups: state => state.groups,
    getSelectedGroup: state => state.userLoggedIn.selectedGroup._id,
    getSelectedGroupObject: state => state.userLoggedIn.selectedGroup,
    openSideMenu: state => state.openSideMenu,
  },
});

export default store;
