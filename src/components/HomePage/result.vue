<template>
  <router-link class="result disableAnchorStyle" role="button" v-on:click="viewAlgorithm" :to="AlgorithmPageURL" tabindex=0>
    <div class="name">{{result.item.name}}</div>
    <div class="longName">{{result.item.longName}}</div>
    <span class="tag" v-for="tag in result.item.tags">
      {{tag}}
    </span>
    <div class="description">{{result.item.description}}</div>
  </router-link>
</template>

<script>

export default {
  name: 'Result',
  props: {
    result: Object,  
  },
  data() {
    return {
        
    };
  },
  computed: {
    AlgorithmPageURL(url) {
      return(`/a/${this.result.item.url}`);
    },
  },
};

</script>

<style scoped lang="scss">
@import '../../styles/shared';

.result {
  margin-top: 1em;
  /*border: 1px solid #333;*/
  padding: 1em;
  box-sizing: border-box;
  transition: 0.2s;
  cursor: pointer;
  display: block;
  > * {
    transition: 0.2s;
  }
  .name {
    font-size: 1.5em;
  }
  .longName {
    color: $d7;
  }
  .tag {
    @include tag;
    background: $l1;
    color: $l7;
  }
  .description {
    color: $l5;
  }
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    .description {
        color: $d7;
    }
  }
  &:focus {
    outline: auto;
  }
}
</style>
