<script>
  import { Building, WaveSquare } from "tabler-icons-svelte";
  export let value = 1;
  export let isBuilding = true;
  export let isDigits = false;
</script>

<div class="wrapper">
  <button class:selected={isBuilding} on:click={() => (isBuilding = !isBuilding)}
    ><Building /></button
  >
  <button class:selected={isDigits} on:click={() => (isDigits = !isDigits)}
    ><WaveSquare /></button
  >
</div>

<style lang="postcss">
  .wrapper {
    z-index: 1;
    position: absolute;
    display: flex;
    top: 1rem;
    right: 1rem;
    gap: 1rem;
    @apply p-2 bg-white border-1 border-gray-300 rounded-md gdark:bg-gray-800 gdark:border-gray-650;
    button {
      @apply transition-all;
      @apply border-1 border-gray-200 p-1 rounded-md text-gray-450 gdark:text-gray-500 gdark:border-gray-700;
      @apply hover:border-gray-400 gdark:hover:border-gray-500 hover:text-gray-700 gdark:hover:text-gray-300;
      &.selected {
        @apply border-primary text-primary gdark:text-secondary gdark:border-secondary;
      }
    }
  }
</style>
