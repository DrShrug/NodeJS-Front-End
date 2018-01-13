<template>
  <div id="page">
    <MessagePopup :propsHide="popupHide"
                :propsMessage="popupMessage"
                :propsClass="popupType"
                :propsHeader="popupHeader"></MessagePopup>

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
        <div class="container box is-shadowless todoApp">
          <TodoApp></TodoApp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import TodoApp from '@/components/TodoApp';
import MessagePopup from '@/components/MessagePopup';

export default {
  name: 'TodoPage',
  components: {
    Navbar,
    TodoApp,
    MessagePopup,
  },
  data() {
    return {
      popupHide: true,
      popupType: '',
      popupMessage: '',
      popupHeader: '',
    };
  },
  methods: {
    updateDBPopup(message, popupType, header) {
      this.popupHide = false;
      this.popupType = popupType;
      this.popupMessage = message;
      this.popupHeader = header;
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

.todoApp {
  background: transparent;
  margin-top: 0;
}

.sidemenu {
  background: #2F3C53;
  color: white;
  height: 100%;
}
</style>
