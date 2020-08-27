<template>
  <section class="hero is-small is-info">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="../">
              <img src="assets/logo.png" alt="Logo" />
            </a>
            <span class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
              <span class="navbar-item">
                <a
                  class="button is-white is-outlined"
                  href="https://github.com/Marco-Pagani/covid_dashboard"
                >
                  <span class="icon">
                    <i class="fab fa-github"></i>
                  </span>
                  <span>View Source</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <h1 class="title is-size-1">
              Coronavirus in the United States<br />
            </h1>
            <h2 class="subtitle">
              A collection of up to date graphics to understand the state of our
              country
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    
}
</script>