<script>
    import { getContext, onMount } from "svelte/internal";
    import { isDragging,gridSize } from "../store/stores";
    

     export let material = 'water';

     export let count = '';
     export let attribute = 'blank';
     let isLeft = true;
    let isRight = true;
    let isDown = true;
    let isLeftDown = true;
    let isRightDown = true;
    let nextDownPos; 
     let  nextLeftDownPos; 
     let  nextLeftPos; 
     let  nextRightDownPos;
     let nextRightPos; 
     
    //  console.log(material)
     let localCurrentPixel;
  onMount(()=>{
      pixelMovement(localCurrentPixel);

  })
  
     function pixelMovement(pixel) {
      pixel.addEventListener("mousedown", mouseDownFunc);
      pixel.addEventListener("mouseover", (e) => {
        if ($isDragging) {
          let currentPixel = e.target;
          currentPixel.classList.add(material);
        if(material === 'walls')
        return;
            setInterval(() => {
            let currentPosition = currentPixel.id;
            currentPixel.classList.remove(material);
            checkSurroundingWater(currentPosition);
            currentPosition = getNextPixelPositionWater(currentPosition).toString();
          console.log({currentPosition})
          // console.log({isLeft,isRight,isDown,isLeftDown,isRightDown})
            let nextPixel = document.getElementById(currentPosition);
            nextPixel.classList.add(material);
            currentPixel = nextPixel;
          }, 200);
        
        }
      });
      pixel.addEventListener("mouseup", mouseUpFunc);
    }
    
    function getNextPixelPositionWater(currentPosition) {
      if (isDown === true) {
        return parseInt(currentPosition) + $gridSize;
      }
      if (isLeftDown === true) {
        return parseInt(currentPosition) + $gridSize - 1;
      }
      if (isLeft === true) {
        return parseInt(currentPosition) - 1;
      }
      if (isRightDown === true) {
        return parseInt(currentPosition) + $gridSize + 1;
      }
      if (isRight === true) {
        return parseInt(currentPosition) + 1;
      }
      else return parseInt(currentPosition)
    }
  
    function mouseDownFunc() {
      isDragging.set(true);
    }
    
    function mouseUpFunc() {
      isDragging.set(false)
    }
  
    function checkSurroundingWater(currentPosition) {
    
    isLeft = true;
    isRight = true;
    isDown = true;
    isLeftDown = true;
    isRightDown = true;
    nextDownPos = parseInt(currentPosition) + $gridSize;
    nextLeftDownPos = parseInt(currentPosition) + $gridSize - 1;
    nextLeftPos = parseInt(currentPosition) - 1;
    nextRightDownPos = parseInt(currentPosition) + $gridSize + 1;
    nextRightPos = parseInt(currentPosition) + 1;
    let nextDownPixel = document.getElementById(`${nextDownPos}`);
    let nextLeftPixel = document.getElementById(`${nextLeftPos}`);
    let nextRightPixel = document.getElementById(`${nextRightPos}`);
    let nextLeftDownPixel = document.getElementById(`${nextLeftDownPos}`);
    let nextRightDownPixel = document.getElementById(`${nextRightDownPos}`);
    if (
      nextDownPixel.classList.contains("water") ||  nextDownPixel.classList.contains("walls") 
    ) {
      isDown = false;
    }
    if (
      nextLeftPixel.classList.contains("water") || nextLeftPixel.classList.contains("walls")
    ) {
      isLeft = false;
    }
  
    if (nextLeftDownPixel.classList.contains("water")  || nextLeftDownPixel.classList.contains("walls") ) {
      isLeftDown = false;
    }
    if (
      nextRightPixel.classList.contains("water") || nextRightPixel.classList.contains("walls") 
    ) {
      isRight = false;
    }
    if (nextRightDownPixel.classList.contains("water") ||  nextRightDownPixel.classList.contains("walls") ) {
      isRightDown = false;
    }
  }
  
  
    
  
  
  </script>
  
  <div  class="{attribute}" id="{count}"  data-id="{count}" on:dragstart={e=>e.preventDefault} bind:this={localCurrentPixel}>
  </div>
  
  
  <style>
      .walls{
          background: brown;
      }
     .water{
      background: aqua;
     }
  
    
  
  </style>