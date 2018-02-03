<template>
    <nav class="navbar has-shadow" role="navigation" aria-label="dropdown navigation">
    <div class="container is-fluid">

      <div class="navbar-brand">
        <a class="navbar-item" href="/todo">
          <img src="../../static/favicon.png" alt="Logo">
          {{ $t('app_title') }}
        </a>

        <div class="navbar-burger burger" data-target="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" id="menu">
        <div class="navbar-start">
          <a class="navbar-item">
            {{ $t('switch_group') }}
          </a>
        </div>

        <div class="navbar-end">
          <a class="navbar-item" href="https://github.com/" target="_blank">
            <span class="icon">
              <i class="fa fa-lg fa-github"></i>
            </span>
          </a>
          <a class="navbar-item" href="/test">
            Testing ground
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ $t('language_switcher') }}
            </a>
            <div class="navbar-dropdown is-right language_dropdown">
              <div class="flex-container navbar-item" @click="changeLanguage('en')">
                <div class="">English</div>
                <div class="flag_fix"><img src="./../assets/usa.png" alt="English"></div>
              </div>
                
              <div class="flex-container navbar-item" @click="changeLanguage('fr')">
                <div class="is-pulled-left">Français</div>
                <div class="flag_fix"><img src="./../assets/france.png" alt="English"></div>
              </div>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ $t('account') }}
            </a>
            <div class="navbar-dropdown is-right">
              <div class="navbar-item loggedinContainer">
                {{ $t('acc_signedin') }}<br/>
                {{ $store.getters.getUsername }}
              </div>
              <hr class="navbar-divider">
              <a class="navbar-item" href="/account/overview">
                {{ $t('acc_overview') }}
              </a>
              <a class="navbar-item">
                {{ $t('acc_pref') }}
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                {{ $t('logout') }}
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<i18n>
{
  "en": {
    "app_title": "Task manager",
    "switch_group": "Switch group",
    "language_switcher": "Languages",
    "account": "Account",
    "acc_signedin": "Signed in as",
    "acc_overview": "Overview",
    "acc_pref": "Preferences",
    "logout": "Logout"
  },
  "fr": {
    "app_title": "Gestionnaire des tâches",
    "switch_group": "Changer de groupe",
    "language_switcher": "Langues",
    "account": "Compte",
    "acc_signedin": "Authentifié en tant que",
    "acc_overview": "Aperçu",
    "acc_pref": "Préférences",
    "logout": "Déconnexion"
  }
}
</i18n>

<script>
export default {
  methods: {
    changeLanguage(lang) {
      this.$store.dispatch('switchLanguage', lang);
    },
    logout() {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>
.flag_fix {
  align-items: center;
  margin: 5px 0 0 0;
}
.flex-container {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
}
.flex-container:hover {
  background-color: whitesmoke;
}
.language_dropdown {
  min-width: 130px;
}
.loggedinContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
