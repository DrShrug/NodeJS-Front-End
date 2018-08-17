<template>
  <div class="slideout" :class="{ isOpen: $store.getters.openSideMenu }">
    <div class="slideout-menu">
      
      <div class="header-menu">
        <div class="slideout-menu-item">{{ $t('dashboard') }}</div>
        <div class="slideout-menu-item flex-container">
          <figure class="image is-96x96">
            <img class="round-image" src="https://png.icons8.com/ultraviolet/2x/person-male.png">
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
            {{ $t('manage_dropdown') }}
          </li>
          <ul class="submenu">
            <li class="submenu-item" @click="$router.push('/group/overview')">
              <span class="icon is-pulled-left">
                <i class="fa fa-clipboard"></i>
              </span>
              {{ $t('overview') }}
            </li>
            <li class="submenu-item" @click="$router.push('/group/addMember')">
              <span class="icon is-pulled-left">
              <i class="fa fa-user-plus" aria-hidden="true" />
            </span>
              {{ $t('add_member') }}
            </li>
            <li class="submenu-item" @click="$router.push('/group/removeMember')">
              <span class="icon is-pulled-left">
                <i class="fa fa-user-times" aria-hidden="true" />
              </span>
              {{ $t('remove_member') }}
            </li>
            <li class="submenu-item" @click="$modal.show('deleteGroup')">
              <span class="icon is-pulled-left">
                <i class="fa fa-trash" aria-hidden="true" />
              </span>
              {{ $t('delete_group') }}
            </li>
          </ul>
          <li class="slideout-menu-link">
            <span class="icon is-pulled-left">
              <i class="fa fa-cog" aria-hidden="true" />
            </span>
            {{ $t('other') }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "dashboard": "Dashboard",
    "manage_dropdown": "Manage group",
    "overview": "Group overview",
    "add_member": "Add member",
    "remove_member": "Remove member",
    "delete_group": "Delete group",
    "other": "Other thing"
  },
  "fr": {
    "dashboard": "Tableau de bord",
    "manage_dropdown": "Gestion du groupe",
    "overview": "Aperçu du groupe",
    "add_member": "Ajout de membre",
    "remove_member": "Retirer des membres",
    "delete_group": "Supression du groupe",
    "other": "Autre"
  }
}
</i18n>

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
