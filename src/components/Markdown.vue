<template>
  <div>
    <div v-html="renderedHtml"></div>
  </div>
</template>

<script>
import * as marked from 'marked';

export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
    },
  },
  data() {
    return {
      renderedHtml: this.getRenderedMarkdown(this.content),
    };
  },
  methods: {
    getRenderedMarkdown(markdownText) {
      return marked(markdownText);
    },
  },
  watch: {
    content(val) {
      this.renderedHtml = this.getRenderedMarkdown(val);
    },
  },
};

</script>

<style scoped>

</style>
