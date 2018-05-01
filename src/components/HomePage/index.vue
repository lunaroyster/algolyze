<template>
  <div>
    <section id="searchPanel" class="py-5">
      <div class="container">
        <h1 class="logo py-2">algolyze</h1>
        <h6 class="logo undertext py-2">A searchable database of algorithms</h6>
        <div class="form-group py-2">
          <input class="form-control text-center" placeholder="Search for algorithms" type="text" name="search" v-model="searchTerm">
        </div>
      </div>
    </section>
    <section id="resultsPanel" v-if="searchTerm">
      <div class="results container" v-if="searchResults.length > 0">
        <result :result="result" v-for="result in searchResults"></result>
      </div>
      <div class="noresults container" v-if="searchResults == 0">
        <div class="jumbotron">
          <h2 class="display-5">No results</h2>
          <p class="lead">Try something different</p>
        </div>
      </div>
    </section>
    <section id="options" v-if="!searchTerm">
      <div class="container">
        <router-link to="/tags" class="disableAnchorStyle">
          <div class="jumbotron">
            <h2 class="display-5">Tags</h2>
            <p class="lead">Find algorithms by category</p>
          </div>
        </router-link>
        <router-link to="/list" class="disableAnchorStyle">
          <div class="jumbotron">
            <h2 class="display-5">List</h2>
            <p class="lead">View all algorithms</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import algorithmService from '@/services/algorithmService';
import Result from './result';

export default {
  name: 'HomePage',
  components: {
    'result': Result,
  },
  computed: {
    searchResults() {
      return algorithmService.fuzzySearch(this.searchTerm);
    },
  },
  data() {
    return {
      searchTerm: null,
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
