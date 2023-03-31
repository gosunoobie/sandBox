<script>
  import { onMount } from "svelte";
  import Pixel from "./pixel.svelte";
   import {pixelArray,gridSize} from '../store/stores'

  let gridContainer;
  
  let attribute;
  export let material;
  
  onMount( ()=>{
  console.log("gridCOntainer" , gridContainer);
  createGrid();
  console.log('pixelArray',$pixelArray)

  })
  
  
  function createGrid(){
   let count = 0;

    for(let i = 0;i<$gridSize;i++ ){
        for(let j=0;j<$gridSize;j++){
            if(i == $gridSize -1 || j == 0 || j == $gridSize -1)
            attribute = 'walls';
            else
            attribute = 'blank';
            
         pixelArray.update(value => [...value,{count,attribute}])
        count ++;
        }
    }
  }

</script>


<section class="grid-container" bind:this={gridContainer}
style="grid-template-columns :repeat({$gridSize},1fr)" 
>

{#each $pixelArray as pixel}
<Pixel {...pixel} material={material}/>

{/each}

</section>

<style>
      .grid-container{
    display: grid;
    width: 400px;
    height: 500px;
    /* grid-template-columns: repeat(30,1fr); */
  }
</style>