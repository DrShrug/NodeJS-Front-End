<template>
  <div id="page" style="background-color: #F5F6F7">
    <SavedPopup :propsHide="popupHide"
                :propsMessage="popupMessage"
                :propsClass="popupType"></SavedPopup>

    <Navbar></Navbar>
    <div class="columns">
      <div class="column">
        
        <!-- Hero Header -->
        <section class="hero landingSection">
          <div class="hero-body">
            <div class="container">
              <h1 class="title heroText">
                Online Todo App
              </h1>
              <h2 class="subtitle heroText">
                Built with VueJS and NodeJS
              </h2>
            </div>
          </div>
        </section>

        <!-- Todo application -->
        <div class="container box is-shadowless transparentBG">
          <TodoApp></TodoApp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import SideMenu from '@/components/SideMenu';
import TodoApp from '@/components/TodoApp';
import SavedPopup from '@/components/ChangesSavedPopup';

export default {
  name: 'TodoPage',
  components: {
    Navbar,
    SideMenu,
    TodoApp,
    SavedPopup,
  },
  data() {
    return {
      popupHide: true,
      popupType: '',
      popupMessage: '',
    };
  },
  methods: {
    updateDBPopup(message, popupType) {
      this.popupHide = false;
      this.popupType = popupType;
      this.popupMessage = message;
      setTimeout(this.closePopup, 2000);
    },
    closePopup() {
      this.popupHide = true;
    },
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

.transparentBG {
  background: transparent;
}

.sidemenu {
  background: #2F3C53;
  color: white;
  height: 100%;
}
</style>
