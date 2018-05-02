<template>
  <div id="tagsView">
    <section id="tagInfo" class="py-4">
      <div class="container">
        <h1>Tags</h1>
        <p>Algorithms are grouped by tags. Click on any of these tags to view related algorithms and subtags.</p>
      </div>
    </section>
    <div class="container pre py-4" v-if="selectedIndex!=0">
      <div v-for="tag in tags.slice(0, selectedIndex)" class="tag" v-on:click="selectTag(tag, true)">
        <span class="count">{{tag.count}}</span>
        <span class="name">{{tag.name}}</span>
      </div>
    </div>
    <div class="container-fluid selected py-4" v-if="selectedTags.length>0">
      <div class="container">
        <h2 class="py-2">
          <span v-for="(tag, i) in selectedTags" v-on:click="removeTag(tag)">
            <span class="selectedTag p-2">{{tag.name}}</span>
            <span v-if="i+1!=selectedTags.length"> > </span>
          </span>
        </h2>
        <div v-for="tag in subTags" class="tag dark" v-on:click="selectTag(tag)">
          <span class="count">{{tag.count}}</span>
          <span class="name">{{tag.name}}</span>
        </div>
        <router-link v-for="algorithm in selectedAlgorithms" class="algorithm disableAnchorStyle py-4" :to="getAlgorithmURL(algorithm)">
          <span class="name">{{algorithm.name}}</span>
          <span class="longName text-truncate">{{algorithm.description}}</span>
        </router-link>
      </div>
    </div>
    <div class="container post py-4">
      <div v-for="tag in tags.slice(selectedIndex+1)" class="tag" v-on:click="selectTag(tag, true)">
        <span class="count">{{tag.count}}</span>
        <span class="name">{{tag.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import algorithmService from '@/services/algorithmService';

export default {
  name: 'AlgorithmTags',
  data() {
    return {
      selectedTags: [],
      algorithmCollection: null,
    };
  },
  computed: {
    tags() {
      if(!this.algorithmCollection) return [];
      return this.algorithmCollection.getCountedTags();
    },
    selectedAlgorithms() {
      let selectedTagNames = this.selectedTags.map(t=>t.name);
      return this.algorithmCollection.getAlgorithms(...selectedTagNames);
    },
    subTags() {
      let selectedTagNames = this.selectedTags.map(t=>t.name);
      let totalSubTags = this.algorithmCollection.getSubTags(...selectedTagNames);
      let nonDupeSubTags = [];
      for(let subTag of totalSubTags) {
          if(this.selectedTags.findIndex(t=>t.name == subTag.name)!=-1) continue;
          nonDupeSubTags.push(subTag);
      }
      return nonDupeSubTags;
    },
    selectedIndex() {
      if(this.selectedTags.length == 0) return Infinity;
      return this.tags.indexOf(this.selectedTags[0]);
    },
  },
  methods: {
    selectTag(tag, reset) {
      console.log(this.selectedTags, tag);
      if(reset) this.selectedTags = [];
      if(this.selectedTags.findIndex(t=>t.name == tag.name)!=-1) return;
      this.selectedTags.push(tag);
    },
    removeTag(tag) {
      if(this.selectedTags.indexOf(tag)==0) {
        this.selectedTags = [];
      }
      else {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      }
    },
    getAlgorithmURL(algorithm) {
      return `/a/${algorithm.url}`;
    }
  },
  async beforeRouteEnter(to, from, next) {
    let algorithmCollection = await algorithmService.getAlgorithmMasterCollection();
    next(vm => vm.algorithmCollection = algorithmCollection);
  },
};

</script>

<style lang="scss" scoped>
@import '../../../styles/shared';

#tagsView {
  .tag {
    display: inline-flex;
    background-color: $l1;
    margin: 1px;
    transition: 0.2s all;
    cursor: pointer;
    > * {
      padding: 0.5em;
      @media (min-width: 992px) {
        padding: 1em;
      }
    }
    .count {
      transition: 0.2s all;
      background-color: $l2;
    }
    &:hover {
      background-color: $l2;
      .count {
        background-color: $l3;
      }
    }
    &.dark {
      background-color: $d1;
      .count {
        background-color: $d2;
      }
      &:hover {
        background-color: $d2;
        .count {
          background-color: $d3;
        }
      }
    }
    
  }
  #tagInfo {
    background-color: $d0;
    color: $l0;
  }
  .selected {
    background: $d0;
    color: $l0;
    border-top: 2px solid $d1;
    .selectedTag {
      cursor: pointer;
      transition: 0.2s all;
      &:hover {
        background-color: $d1;
      }
    }
    .algorithm {
      display: block;
      transition: 0.2s all;
      border-bottom: 2px dashed $d2;
      cursor: pointer;
      .name {
        
      }
      .longName {
        color: $l4;
        display: block;
      }
      &:hover {
        border-bottom: 2px dashed $l2;
      }
    }
  }
}
</style>
