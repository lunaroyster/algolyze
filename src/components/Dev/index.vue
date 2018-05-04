<template>
	<div>
		<section id="landingPanel">
			<div class="container">
                <div class="row">
                </div>
				<div class="row">
                    <div id="helperText" class="col-auto">
                        Just go right ahead and start typing <br /> We'll do all the heavy lifting.
                    </div>

                    <div class="d-flex flex-row mb-3 align-items-star" id="fuzzy">
    					<div class="p-2" id='algolyzeMain'>
    						algolyze
    					</div>
    					<div class="p-2" id="separator">
    						|
    					</div>
    					<div class="p-2" id="searchy">
    						<input class="searchy" name="search" placeholder="fuzzy search" style="border:none" type="text">
    					</div>
    				</div>
				</div>

                <div class="row justify-content" id="texty">
                    <div class="col-auto align-self-start">
                        Or try out these other options:
                    </div>

                </div>

                <div class="row justify-content-center" id="footer">
                    <div class="col-4" id="showAllAlgos">
                        <img src="static/tags.png" class="center-block" alt="Responsive image" id="tags">
                        Find algorithms by category
                    </div>

                    <div class="col-4">
                        <img src="static/list.png" class="center-block" alt="Responsive image" id="list">
                        Just show me all the algorithms
                    </div>
                </div>

                <!-- TODO: decide between card layout and grids  -->
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
    padding-bottom: 5px;
  }
  ::-moz-placeholder {
    color: #717171;
    font-size: 90px;
    padding-bottom: 5px;
  }
  :-ms-input-placeholder {
    color: #717171;
    font-size: 90px;
    padding-bottom: 5px;
  }
  ::placeholder {
    color: #717171;
    font-size: 90px;
    padding-bottom: 5px;
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
      padding-top: 5px;
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
#footer{
    padding-bottom: 50px;
    position: absolute;
    left: 25%;
    bottom: 10%;
}
#list{
    max-width: 20%;
}
#tags{
    max-width: 20%;
}
#showAllAlgos{

}
#texty{
    position: absolute;
    bottom: 30%;
}
#helperText{
    position: absolute;
    top: 25%;
    left: 48%;
}
</style>
