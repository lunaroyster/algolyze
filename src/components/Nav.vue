<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark py-3" id="mainNav">
    <a href="#" class="navbar-brand">algolyze</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <a id="gh" class="mx-2 navbar-brand" href="https://github.com/lunaroyster/algolyze" target="_blank" ng-click="outboundClick(event)" data-toggle="tooltip" data-placement="bottom" title="Contribute to lunaroyster/algolyze"><img src="static/GitHub-Mark-Light-120px-plus.png" height="30px"></a>
      <!--<script>$('#gh').tooltip()</script>-->
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#!/">Fuzzy Search</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#!/tags">Find By Tags</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#!/list">List algorithms</a>
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
