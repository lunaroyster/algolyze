<template>
  <div>
    <router-view/>
    <section id="landingPanel" class="pt-0">
      <div class="container">
        <div id="fuzzy">

            <div class="logo pt-5"><span class="algolyzeMain">algolyze</span><span class="separator">|</span>
                <span class="searchy">
                    <input class="searchy text-center" placeholder="fuzzy search" type="text" name="search" v-model="searchTerm">
                </span>
            </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

export default {
  name: 'DevPage',
};
</script>

<style scoped lang="scss">
@import '../../styles/shared';

#landingPanel {
  // padding-top: 4em;
  // padding-bottom: 4em;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  * {
    color: $l0;
  }
  background-color: $d1;
  // .logo {
  //   font-family: 'SourceCodeProRegular', monospace !important;
  //   font-weight: 100;
  //   font-size: 100px;
  //   top:30%;
  // }
}
#fuzzy {
    position: absolute;
    top: 30%;
    input[type="text"] {
      background-color: $d1 !important;
      font-family: 'GothamHTF-Book', monospace !important;
      font-size: 90px;

    }
    textarea:focus, input:focus{
    outline: none;
}
*:focus {
    outline: none;
}
    ::-webkit-input-placeholder {
      color: #717171;
      font-size: 90px;
    }
    ::-moz-placeholder {
      color: #717171;
      font-size: 90px;
    }
    :-ms-input-placeholder {
      color: #717171;
      font-size: 90px;
    }
    ::placeholder {
      color: #717171;
      font-size: 90px;
    }
}
.logo .algolyzeMain{
  font-family: 'SourceCodeProRegular', monospace !important;
  font-weight: 100;
  font-size: 100px;
}
.logo .separator{
  font-family: 'SourceCodeProLight', monospace !important;
  font-weight: 100;
  font-size: 100px;
}

</style>
