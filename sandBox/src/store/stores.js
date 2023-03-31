import { readable, writable } from "svelte/store";

export let pixelArray = writable([]); 

export let isDragging = writable(false);

export let gridSize = readable(40);


// export let waterMaterial = readable('water');