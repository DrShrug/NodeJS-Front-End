<template>
  <div id="group-manager">
    <Navbar />
    <div class="sidemenu-relative">
      <Sidemenu ref="sidemenu" class="sidemenu" />
      <div class="container box spacer is-shadowless">
        <!-- Hero -->
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <h1 class="title">
              {{ $t('hero-title') }}
            </h1>
            <h2 class="subtitle">
              {{ $store.getters.getSelectedGroupObject.groupName }}
            </h2>
          </div>
        </section>

        <!-- Quick information overview -->
        <section class="info-tiles box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">{{ $t('rundown-title') }}</p>
            <hr class="navbar-divider half-size">
          </div>
          <nav class="level">
            <TileItem :type="$t('rundown-completed')" :data="countCompletedTasks" :icon="'fa-check'" />
            <TileItem :type="$t('rundown-uncompleted')" :data="countUncompletedTasks" :icon="'fa-tasks'" />
            <TileItem :type="$t('rundown-overdue')" :data="countLateTasks" :icon="'fa-clock-o'" />
            <TileItem :type="$t('rundown-total')" :data="$store.getters.allTodos.length" :icon="'fa-list-ul'" />
        </nav>
        </section>

        <!-- Charts and graphs -->
        <div class="box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">{{ $t('chart-title') }}</p>
            <hr class="navbar-divider half-size">
          </div>
          <div class="columns">
            <div class="column is-5">
              <Chart :chartData="$store.getters.allTodos"
                :type="'completedAtMonth'" 
                :title="$t('completedAt')" 
                :color="'#4c90ff'">
              </Chart>
            </div>
            <div class="column is-5 is-offset-2">
              <Chart :chartData="$store.getters.allTodos"
                :type="'completeByMonth'"
                :title="$t('completeBy')"
                :color="'#f87979'">
              </Chart>
            </div>
          </div>
        </div>

        <!-- Completion details -->
        <div class="box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">{{ $t('table-title') }}</p>
            <hr class="navbar-divider half-size">
          </div>
          <CompletionTable class="side-spacer" />
        </div>
      </div>

    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "hero-title": "Group Overview",
    "rundown-title": "Quick rundown",
    "rundown-completed": "Completed",
    "rundown-uncompleted": "Uncompleted",
    "rundown-overdue": "Overdue",
    "rundown-total": "Total",
    "chart-title": "Task completion chart",
    "completedAt": "Completed at month",
    "completeBy": "To be completed by month",
    "table-title": "Task completion table"
  },
  "fr": {
    "hero-title": "Aperçu du groupe",
    "rundown-title": "Résumé rapide",
    "rundown-completed": "Complétée",
    "rundown-uncompleted": "Inachevé",
    "rundown-overdue": "En retard",
    "rundown-total": "Total",
    "chart-title": "Graphique des tâches",
    "completedAt": "Complété en",
    "completeBy": "À être complété avant",
    "table-title": "Tableau des tâches complétées"
  }
}
</i18n>

<script>
import Navbar from '@/components/Navbar';
import Sidemenu from '@/components/Sidemenu';
import CompletionTable from '@/components/Group/Overview/CompletionTable';
import Chart from '@/components/Group/Overview/Chart';
import TileItem from '@/components/Group/Overview/InfoTilesItem';

export default {
  components: {
    Navbar,
    Sidemenu,
    CompletionTable,
    Chart,
    TileItem,
  },
  computed: {
    countCompletedTasks() {
      return this.$store.getters.allTodos.filter(todo => todo.isCompleted).length;
    },
    countLateTasks() {
      return this.$store.getters.allTodos.filter(todo =>
      todo.completeByTime < new Date().getTime()
      && !todo.isCompleted).length;
    },
    countUncompletedTasks() {
      return this.$store.getters.allTodos.length - this.$store.getters.allTodos.filter(todo =>
        todo.isCompleted).length;
    },
  },
};
</script>


<style scoped>
  #group-manager {
    background-color: #F5F6F7;
  }
  .spacer {
    background-color: transparent;
  }
  .side-spacer {
    width: 90%;
    margin: auto;
  }
  .welcome-message-area {
    margin-bottom: 10px;
  }
  .info-tiles {
    margin: 1rem 0;
  }
  .info-tiles .subtitle {
    font-weight: 300;
  }
  .hero.welcome.is-info {
    background: #36D1DC;
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
    background: linear-gradient(to right, #5B86E5, #36D1DC);
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