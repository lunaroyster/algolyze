<template>
	<div>
		<section id="landingPanel" class="d-flex">
			<div class="container m-auto">
				<div class="row py-5">
                    <div id="helperText" class="col-auto">
                        Just go right ahead and start typing<br /> We'll do all the heavy lifting.
                    </div>

                    <div class="d-flex flex-row py-4" id="MainLanding">
    					<div class="" id='algolyzeMain'>
    						algolyze
    					</div>
    					<div class="" id="LogoPipe">
    						|
    					</div>
						<input id="SearchBox" name="search" placeholder="fuzzy search" style="border:none" type="text" autocomplete="off" @click="searchLaunch">
    				</div>
				</div>

                <div class="row justify-content py-5">
                    <div class="col-auto align-self-start">
                        Or try out these other options:
                    </div>
                </div>

                <div class="d-flex flex-row" id="footer">
                    <div class="" @click="categorySearch">
                        <img src="static/tags.png" class="center-block m-2" alt="Responsive image" id="tags">
                        <span>Find algorithms by category</span>
                    </div>

                    <div class="">
                        <img src="static/list.png" class="center-block m-2" alt="Responsive image" id="list">
                        <span>Just show me all the algorithms</span>
                    </div>
                </div>
			</div>
		</section>
	</div>
</template>

<script>

export default {
  name: 'DevPage',
  methods: {
    searchLaunch() {

    }
  }
};

</script>

<style scoped lang="scss">
@import '../../styles/shared';
#landingPanel {
	height: 100vh;
	overflow: auto;
	* {
		color: $l0;
	}
	background-color: $d1;
	::placeholder {
		color: #717171;
		font-size: 90px;
		padding-bottom: 5px;
	}
	#helperText {
		left: 48%;
	}
	#MainLanding {
		width: 100%;
		input[type="text"] {
			background-color: $d1 !important;
			font-family: 'GothamHTF-Book', monospace !important;
			font-size: 90px;
			padding-top: 5px;
			line-height: 100%;
			height: 100%;
		}
		#algolyzeMain {
			font-family: 'SourceCodeProRegular', monospace !important;
			font-weight: 100;
			font-size: 100px;
			flex: 1 0 auto;
		}
	    #LogoPipe {
	       font-family: 'SourceCodeProLight', monospace !important;
	       font-weight: 100;
	       font-size: 100px;
	   	}
		#SearchBox {
		    flex: 0 1 auto;
			width: 100%;
		}
	}
	#footer {
		#list, #tags {
			max-width: 15%;
		}
	}
}
textarea:focus, input:focus{
    outline: none;
}

</style>
