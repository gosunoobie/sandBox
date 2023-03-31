<script>
  import { setContext } from "svelte";
  import Grid from "./components/grid.svelte";
  
  let material = 'water';
  
  
</script>

<Grid material={material}/>


<button class="water-btn" on:click={e=>material='water'}>
  Water
</button>

<button class="walls-btn" on:click={e=>material='walls'}>
  Walls
</button>