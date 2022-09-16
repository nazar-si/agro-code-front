<script>
  import { onMount } from "svelte";
  import { Plus } from "tabler-icons-svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  let component = null;
  export let add = true;
  export let show = false;
  export let allowClose = true;
  onMount(() => {
    document.body.appendChild(component);
  });
</script>

<div class="wrapper" bind:this={component} on:click|self class:show>
  {#if show}
    <div class="frame" transition:scale>
      {#if allowClose}
        <button class="close" on:click={() => (show = false)}>
          <Plus size={16} strokeWidth={1} /></button
        >{/if}
      <slot />
    </div>
  {/if}
  {#if show && add}
    {#if $$slots.add}
      <div class="frame" transition:scale>
        <slot name="add" />
      </div>
    {/if}
  {/if}
</div>

<style lang="postcss">
  .wrapper {
    transition: opacity 0.2s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    gap: 1rem;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    @apply bg-gray-900/50;
    .frame {
      position: relative;
      @apply p-5 border-2 transition-all;
      @apply bg-gray-100 rounded-md border-gray-300 shadow-main-md;
      @apply text-gray-700 gdark:text-gray-300;
      @apply gdark:bg-gray-800 gdark:border-gray-700;
      .close {
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
        transform: rotate(45deg);
        @apply text-gray-500 gdark:text-gray-400 hover:text-gray-900 gdark:hover:text-gray-50;
      }
    }
    overflow: hidden;
  }
  .wrapper:not(.show) {
    opacity: 0;
    pointer-events: none;
  }
</style>
