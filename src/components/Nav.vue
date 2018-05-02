<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark py-3" id="mainNav">
    <router-link to="/" class="navbar-brand">algolyze</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <a id="gh" class="mx-2 navbar-brand" href="https://github.com/lunaroyster/algolyze" target="_blank" ng-click="outboundClick(event)" data-toggle="tooltip" data-placement="bottom" title="Contribute to lunaroyster/algolyze"><img src="static/GitHub-Mark-Light-120px-plus.png" height="30px"></a>
      <!--<script>$('#gh').tooltip()</script>-->
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Fuzzy Search</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tags">Find By Tags</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">List algorithms</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
nav {
  /*height: 4em;*/
  background: black;
  .navbar-brand {
    font-family: 'Roboto Mono', monospace !important;
  }
}
</style>
