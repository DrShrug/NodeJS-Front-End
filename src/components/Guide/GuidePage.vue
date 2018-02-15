<template>
  <div id="group-manager">
    <Navbar />
    <div class="sidemenu-relative">
      <Sidemenu ref="sidemenu" class="sidemenu" />
      <div class="box spacer is-shadowless">
        <div class="column is-9 is-offset-1">
          <!-- Hero header -->
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <h1 class="title">
                User Guide
              </h1>
            </div>
          </section>

          <!-- Guide sections -->
          <Groups id="groups" />
          <Category id="category" />
          <Todo id="todo" />
          <MemberManagement id="members" />
        </div>

        <div class="column is-2 side-nav">
          <aside class="menu">
            <p class="menu-label">General</p>
            <ul class="menu-list">
              <li>
                <a :class="{'is-active':isSelected('menu-groups')}" @click="scrollTo('groups')">Groups</a>
              </li>
            </ul>
            <p class="menu-label">Todo App</p>
            <ul class="menu-list">
              <li>
                <a :class="{'is-active':isSelected('menu-category')}" @click="scrollTo('category')">Categories</a>
              </li>
              <li>
                <a :class="{'is-active':isSelected('menu-todo')}" @click="scrollTo('todo')">Todos</a>
              </li>
            </ul>
            <p class="menu-label">Member Management</p>
            <ul class="menu-list">
              <li>
                <a :class="{'is-active':isSelected('menu-addmember')}" @click="scrollTo('addmember')">Add a member</a>
              </li>
              <li>
                <a :class="{'is-active':isSelected('menu-removemember')}" @click="scrollTo('removemember')">Removing a member</a>
              </li>
            </ul>
          </aside>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Guide/Guide_Category';
import Groups from '@/components/Guide/Guide_Groups';
import Todo from '@/components/Guide/Guide_Todo';
import MemberManagement from '@/components/Guide/Guide_Members';
import Navbar from '@/components/Navbar';
import Sidemenu from '@/components/Sidemenu';

export default {
  components: {
    Groups,
    Category,
    Todo,
    MemberManagement,
    Navbar,
    Sidemenu,
  },
  data() {
    return {
      activeGuide: 'menu-groups',
    };
  },
  methods: {
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      this.activeGuide = `menu-${id}`;
    },
    isSelected(id) {
      return id === this.activeGuide;
    },
  },
};
</script>

<style scoped lang="scss">
  .side-nav {
    position:fixed;
    right: 0;
    top: 52px;
  }
  .spacer {
    background-color: transparent;
  }
  .welcome-message-area {
    margin-bottom: 10px;
  }
  .hero.welcome.is-info {
    background: #36D1DC;
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
    background: linear-gradient(to right, #5B86E5, #36D1DC);
  }
  .sidemenu {
    position: absolute;
    top: 0;
    z-index: 10;
  }
</style>
