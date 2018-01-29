<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4" style="margin:auto">
            <div class="box groupbox">
              <div>
                <p class="has-text-grey has-text-left">
                  <span class="is-size-4 has-text-grey">Some group</span> 
                </p>
              </div>
              <hr class="navbar-divider">
              <div>
                <p class="has-text-grey has-text-left">
                  Group description
                </p>
              </div>
              <hr class="navbar-divider">
              <div>
                <p class="has-text-grey has-text-right">
                  <span class="icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                  2 Members
                </p>
              </div>
            </div>
            <div class="box groupbox">
              <div>
                <p class="has-text-grey has-text-left">
                  <span class="is-size-4 has-text-grey">Other group</span> 
                </p>
              </div>
              <hr class="navbar-divider">
              <div>
                <p class="has-text-grey has-text-left">
                  This is a very long and pointless pile of text that servers no purpose other
                  than to be placeholder text because I can't come up with anything else
                </p>
              </div>
              <hr class="navbar-divider">
              <div>
                <p class="has-text-grey has-text-right">
                  <span class="icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                  5 Members
                </p>
              </div>
            </div>
            <div class="box groupbox">
              <div>
                <p class="has-text-grey has-text-left">
                  <span class="is-size-4 has-text-grey">Another group</span> 
                </p>
              </div>
              <hr class="navbar-divider">
              <div>
                <p class="has-text-grey has-text-left">
                  Group's description
                </p>
              </div>
              <hr class="navbar-divider">
              <div>
                <p class="has-text-grey has-text-right">
                  <span class="icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                  3 Members
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.hero.is-success {
  background:#272733;
}
.groupbox {
  transition: all .2s ease-in-out;
}
.groupbox:hover {
  transform: scale(1.1);
}
</style>
