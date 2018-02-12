<template>
  <div id="page">
    <Navbar />
    <div class="sidemenu-relative">
      <Sidemenu ref="sidemenu" class="sidemenu" />
      <div id="main-container">
        <section class="hero landingSection">
          <div class="hero-body">
            <div class="container">
              <h1 class="title heroText">
                {{ $t('main_message') }}
              </h1>
              <h2 class="subtitle heroText">
                {{ $t('main_subtitle') }}
              </h2>
            </div>
          </div>
        </section>

        <div class="container box is-shadowless todoApp">
          <TodoApp />
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<i18n>
{
  "en": {
    "main_message": "Online Todo App",
    "main_subtitle": "Built with VueJS"
  },
  "fr": {
    "main_message": "Gestion des tâches",
    "main_subtitle": "Construite avec VueJS"
  }
}
</i18n>

<script>
import Navbar from '@/components/Navbar';
import TodoApp from '@/components/TodoApp/TodoApp';
import Sidemenu from '@/components/Sidemenu';

export default {
  name: 'TodoPage',
  components: {
    Navbar,
    TodoApp,
    Sidemenu,
  },
};
</script>

<style scoped lang="scss">
.bordered {
  border: 3px solid whitesmoke
}

.landingSection {
  background: linear-gradient(141deg,#04a6d7 0,#209cee 71%,#3287f5 100%);
}

.heroText{
  color:white;
}

.todoApp {
  background: transparent;
  margin-top: 0;
}
.tile-header {
    margin-bottom: 20px;
    width: 50%;
  }
.sidemenu {
  position: absolute;
  top: 0;
  z-index: 10;
}
</style>
