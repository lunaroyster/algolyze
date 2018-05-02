<template>
  <div id="algorithmPageView">
    <div class="header">
      <div class="container pb-4">
        <div class="name">{{algorithm.name}}</div>
        <div class="longName">{{algorithm.longName}}</div>
        <div class="tags">
          <span class="tag" v-for="tag in algorithm.tags" v-on:click="viewTag(tag)">
            {{tag}}
          </span>
        </div>
        <div class="description">{{algorithm.description}}</div>
        <div class="widthScrollContainer">
          <div class="similarAlgorithms">
            <router-link class="similarAlgorithm" :style="getAlgorithmStyle(similarAlgorithm)" v-for="similarAlgorithm in similarAlgorithmNames" v-if="similarAlgorithms" :to="getAlgorithmURL(similarAlgorithm)">
              {{similarAlgorithm}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container my-4">
        <Markdown class="longDescription markdowned" :content="algorithm.longDescription" v-if="algorithm.longDescription" />
        <div class="links">
          <div class="link my-4" v-for="link in algorithm.links" v-on:click="viewExternalLink(link)">
            <img :src="link.img" height=96 width=96></img>
            <span>{{link.name}}</span>
          </div>
        </div>
        <div class="longDescription nopage" v-if="!algorithm.longDescription">
          <a href="#!/" class="disableAnchorStyle">
            <div class="jumbotron">
              <h3 class="display-6">Add a page</h3>
              <p class="lead">This algorithm is in need of a page.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import algorithmService from '@/services/algorithmService';
import Markdown from '@/components/Markdown';

export default {
  name: 'AlgorithmPage',
  prop: {
    name: {
      type: String,
    },
  },
  components: {
    Markdown,
  },
  data() {
    return {
      algorithm: {},
      algorithms: [],
      similarAlgorithms: {},
    };
  },
  computed: {
    similarAlgorithmNames() {
      return Object.keys(this.similarAlgorithms).sort((a,b) => {
        return this.similarAlgorithms[b]-this.similarAlgorithms[a];
      });
    },
  },
  methods: {
    getAlgorithmStyle(name) {
      return {"border-color": `rgba(255, 255, 255, ${this.similarAlgorithms[name]}`};
    },
    getAlgorithmURL(algorithmName) {
      let algorithm = this.algorithms.find(a=>a.name == algorithmName);
      return(`/a/${algorithm.url}`);
    },
    viewExternalLink(link) {
      document.location = link.url;
    },
  },
  async beforeRouteEnter(to, from, next) {
    let name = to.params.name;
    let algorithms = await algorithmService.getAlgorithms();
    let algorithm = await algorithmService.getAlgorithmByURL(name);
    let similarAlgorithms = await algorithmService.getSimilarAlgorithms(algorithm.name);
    next(vm => {
      vm.algorithm = algorithm;
      vm.similarAlgorithms = similarAlgorithms;
      vm.algorithms = algorithms;
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.algorithm, this.similarAlgorithms = null, null;
    this.algorithm = await algorithmService.getAlgorithmByURL(to.params.name);
    this.similarAlgorithms = await algorithmService.getSimilarAlgorithms(this.algorithm.name);
    next();
  },
};

</script>

<style lang="scss" scoped>
@import '../../../styles/shared';

#algorithmPageView {
  .header {
    background: $d0;
    .name {
      color: $l0;
      font-size: xx-large;
      font-weight: 100;
    }
    .longName {
      color: grey;
      padding-bottom: 10px;
    }
    .tags {
      padding-bottom: 10px;
      .tag {
        @include tag;
        @include darkTag;
      }
    }
    .description {
      padding: 1em;
      /*margin-bottom: 10px;*/
      color: $l5;
      font-size: larger;
      font-family: 'Open Sans';
      background: $d1;
    }
    .similarAlgorithms {
      min-width: max-content;
      .similarAlgorithm {
        margin-top: 0.5em;
        margin-right: 0.5em;
        display: inline-flex;
        padding: 0.8em;
        font-size: smaller;
        /*margin-right: 10px;*/
        border-left: 2px solid;
        @include darkTag;
      }
    }
  }
}
</style>
