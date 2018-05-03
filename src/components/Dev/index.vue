<template>
  <div>
    <router-view/>
    <section id="landingPanel">
      <div class="container">
        <!-- <div id="fuzzy">
            <div class='row'>
            <div class="algolyzeMain col">algolyze</div>
            <div class="separator col">|</div>
            <div class="searchy col col-md-auto"><input class="searchy" placeholder="fuzzy search" type="text" name="search" v-model="searchTerm"></div>
        </div>
        </div> -->
        <!--  -->
        <!-- <div class="row justify-content-md" id='fuzzy'>
            <div class="col col-md-auto" id='algolyzeMain'>
                algolyze
            </div>
            <div class="col col-md-auto" id='separator'>
                |
            </div>
            <div class="col col-md-auto">
                <input class="searchy" placeholder="fuzzy search" type="text" name="search" v-model="searchTerm">
            </div>

        </div> -->
        <!--  -->
        <div class="d-flex flex-row mb-3" id="fuzzy">
          <div class="p-2" id='algolyzeMain'>algolyze</div>
          <div class="p-2" id="separator">|</div>
          <div class="p-2" id="searchy">
              <input class="searchy" placeholder="fuzzy search" type="text" name="search" v-model="searchTerm" style="border:none">
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

  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  * {
    color: $l0;
    padding: 0;
  }
  .form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
    }
  background-color: $d1;
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

textarea:focus, input:focus{
    outline: none;
}
*:focus {
    outline: none;
}
#fuzzy {
    position: absolute;
    top: 30%;
    input[type="text"] {
      background-color: $d1 !important;
      font-family: 'GothamHTF-Book', monospace !important;
      font-size: 90px;
      padding-top: auto;
      line-height: 100%;
      height: 100%;
    }
    textarea:focus, input:focus{
    outline: none;
}


}
#algolyzeMain{
  font-family: 'SourceCodeProRegular', monospace !important;
  font-weight: 100;
  font-size: 100px;
}
#separator{
  font-family: 'SourceCodeProLight', monospace !important;
  font-weight: 100;
  font-size: 100px;
}

</style>
