<template>
  <div>
    <section id="searchPanel" class="py-5">
      <div class="container">
        <h1 class="logo py-2">algolyze</h1>
        <h6 class="logo undertext py-2">A searchable database of algorithms</h6>
        <div class="form-group py-2">
          <input class="form-control text-center" placeholder="Search for algorithms" type="text" name="search">
        </div>
      </div>
    </section>
    <section id="resultsPanel">
      <div class="results container">
        <result :result="result" v-for="result in searchResults"></result>
      </div>
      <div class="noresults container">
        <div class="jumbotron">
          <h2 class="display-5">No results</h2>
          <p class="lead">Try something different</p>
        </div>
      </div>
    </section>
    <section id="options" ng-show="!searchTerm">
      <div class="container">
        <a href="#!/tags" class="disableAnchorStyle">
          <div class="jumbotron">
            <h2 class="display-5">Tags</h2>
            <p class="lead">Find algorithms by category</p>
          </div>
        </a>
        <a href="#!/list" class="disableAnchorStyle">
          <div class="jumbotron">
            <h2 class="display-5">List</h2>
            <p class="lead">View all algorithms</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import Result from './result';

export default {
  name: 'HomePage',
  components: {
    'result': Result,
  },
  data() {
    return {
      searchTerm: null,
      searchResults: [],
    };
  },
  
};

</script>

<style scoped lang="scss">
@import '../../styles/theme';

#searchPanel {
  padding-top: 4em;
  padding-bottom: 4em;
  * {
    color: $l0;
  }
  background-color: $d0;
  .logo {
    text-align: center;
    font-family: 'Roboto Mono', monospace !important;
    font-weight: 300;
    &.undertext {
        color: $l6;
    }
  }
  input[type="text"] {
    background-color: $d1 !important;
  }
}
</style>
