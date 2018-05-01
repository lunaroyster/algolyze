<template>
  <div id="listView">
    <section id="listInfo" class="py-4">
      <div class="container">
        <h1>List</h1>
        <p>A list of algorithms on algolyze.</p>
      </div>
    </section>
    <section class="py-4">
      <div class="container">
        <div class="card" style="background-color: transparent;">
          <ul class="list-group list-group-flush">
            <router-link class="list-group-item disableAnchorStyle algorithm" v-for="algorithm in algorithms" :to="AlgorithmPageURL(algorithm)">{{algorithm.name}}</router-link>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import algorithmService from '@/services/algorithmService';

export default {
  name: 'ListPage',
  data() {
    return {
      algorithms: null,
    };
  },
  methods: {
    AlgorithmPageURL(algorithm) {
      return(`/a/${algorithm.url}`);
    },
  },
  async beforeRouteEnter(to, from, next) {
    let algorithms = await algorithmService.getAlgorithms();
    next(vm => vm.algorithms = algorithms);
  },
};

</script>

<style scoped lang="scss">
@import '../../styles/shared';

#listView {
  #listInfo {
    background-color: $d0;
    color: $l0;
  }
  ul {
    a.algorithm {
      transition: 0.2s all;
      &:hover {
        background: $l2;
      }
    }
  }
}
</style>
