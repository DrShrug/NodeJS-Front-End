<template>
  <div class="slideout" :class="{ isOpen: $store.getters.openSideMenu }">
    <div class="slideout-menu">
      
      <div class="header-menu">
        <div class="slideout-menu-item">Dashboard</div>
        <div class="slideout-menu-item flex-container">
          <figure class="image is-96x96">
            <img class="round-image" src="https://cdn.discordapp.com/attachments/230447861043560448/412321950040326155/doot_transparent.png">
          </figure>
        </div>
        <div class="slideout-menu-item">
          <span class="icon">
            <i class="fa fa-user"></i>
          </span>
          {{ $store.getters.getDisplayName }}
        </div>
      </div>
      <hr  class="sidemenu-divider" />
      <div class="top-menu">   
        <ul class="submenu-container">
          <li class="submenu-title">
            <span class="icon is-pulled-left">
              <i class="fa fa-users" aria-hidden="true" />
            </span>
            Manage group
          </li>
          <ul class="submenu">
            <li class="submenu-item" @click="$router.push('/group/overview')">
              <span class="icon is-pulled-left">
                <i class="fa fa-clipboard"></i>
              </span>
              Group overview
            </li>
            <li class="submenu-item" @click="$router.push('/group/addMember')">
              <span class="icon is-pulled-left">
              <i class="fa fa-user-plus" aria-hidden="true" />
            </span>
              Add member
            </li>
            <li class="submenu-item" @click="$router.push('/group/removeMember')">
              <span class="icon is-pulled-left">
                <i class="fa fa-user-times" aria-hidden="true" />
              </span>
              Remove member
            </li>
            <li class="submenu-item" @click="$modal.show('deleteGroup')">
              <span class="icon is-pulled-left">
                <i class="fa fa-trash" aria-hidden="true" />
              </span>
              Delete group
            </li>
          </ul>
          <li class="slideout-menu-link">
            <span class="icon is-pulled-left">
              <i class="fa fa-cog" aria-hidden="true" />
            </span>
            Other thing
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
    groupHover: false,
  }),
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    groupMenu() {
      this.groupHover = !this.groupHover;
    },
  },
};
</script>

<style lang="scss">
.slideout {
  position: relative;
  width: 240px;
  height: 100vh;
  background-color: #253342;
  transform: translateX(-100%);
  transition: all .5s ease-in-out;
  
  &.isOpen {
    transform: translateX(0);
  }
}

.slideout-menu-item {
  color: white;
}
.header-menu {
  padding: 24px;
}

.sidemenu-divider {
  margin: 0 24px;
}
.submenu-title, .slideout-menu-link, .submenu-item {
  padding: 10px
}
.slideout-menu-link, .submenu-container {
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #19232d;
  }
}
.submenu-container {
  &.submenu-container:hover {
    .submenu {
      display: block;
      max-height: 300px; // Will never reach this
    }
  }
}
.submenu {
  overflow: hidden;
  max-height: 0;
  transition: all .75s ease-in-out;
  
  .submenu-item {
    background-color: #2D3E50;

    &:hover {
      background-color: #34485e;
    }
  }
}

.top-menu {
  margin-top: 24px;
}
.sidemenu-close:hover {
  background-color: #cecece;
}
.flex-container {
  display: flex;
  justify-content: center;
}
.round-image {
  border-radius: 100%;
}
</style>
