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
    userDetails: null,
    userLoggedIn: {
      name: null,
      email: null,
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
          token: res.headers['x-auth'],
        });
        return res;
      });
    },
    userSignup({ commit }, { email, password }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/users`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          email,
          password,
        },
      }).then((res) => {
        commit('loginSuccess', {
          email: res.data.email,
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
        url: `${process.env.API_URL}/categories/${toDelete}`,
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
      return axios.get(`${process.env.API_URL}/categories`, {
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((res) => {
        commit('setCategoryList', { categoriesData: res.data.categories });
        return res;
      });
    },
    loadTodosFromAPI({ commit }) {
      return axios.get(`${process.env.API_URL}/todos`, {
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
    loadProfileOverview({ commit }) {
      return axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          'x-auth': store.getters.getToken,
        },
      }).then((user) => {
        commit('setUserDetails', { userData: user.data });
        return user;
      }).catch((e) => {
        if (e.response.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    newCategory({ commit, dispatch }, { categoryName }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/categories`,
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
    newTodo({ commit, dispatch }, { task, completeByTime, categoryId, categoryName }) {
      axios({
        method: 'POST',
        url: `${process.env.API_URL}/todos`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': store.getters.getToken,
        },
        data: {
          task,
          completeByTime,
          _category: categoryId,
          categoryName,
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
    switchCompletedVisiblity({ commit }) {
      commit('switchCompletedVisiblity');
    },
  },
  mutations: {
    switchCompletedVisiblity(state) {
      state.userLoggedIn.hideCompleted = !state.userLoggedIn.hideCompleted;
    },
    setTodoList(state, { todosData }) {
      state.todos = [];
      todosData.forEach(todo => state.todos.push(todo));
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
      state.userLoggedIn.name = 'To be implemented';
      state.userLoggedIn.email = userData.email;
      state.userLoggedIn.isLoggedIn = true;
    },
    logoutSuccess(state) {
      state.todos = [];
      state.categories = [];
      state.userDetails = null;
      state.userLoggedIn.hideCompleted = false;
      state.userLoggedIn.isLoggedIn = false;
      state.userLoggedIn.name = null;
      state.userLoggedIn.email = null;
    },
  },
  getters: {
    openProjects: state => state.projects.filter(project => !project.isCompleted),
    isLoggedIn: state => state.userLoggedIn.isLoggedIn && state.userLoggedIn.token !== null,
    allTodos: state => state.todos,
    allCategories: state => state.categories,
    hideCompleted: state => state.userLoggedIn.hideCompleted,
    getEmail: state => state.userLoggedIn.email,
    getToken: state => state.userLoggedIn.token,
    getUserDetails: state => state.userDetails,
  },
});

export default store;
