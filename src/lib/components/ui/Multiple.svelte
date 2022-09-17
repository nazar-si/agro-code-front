<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let components = [];
  export let label = "";
  export let check = false;
  export let value = [0];
  export let disabled = false;
  export let type = "icon";
  //   let value = [0];
</script>

<div class="entry">
  <div class="title">{label}</div>
  <div class="select">
    {#each components as component, i}
      <button
        {disabled}
        class="option"
        class:selected={value.includes(i)}
        on:click={() => {
          if (!check) {
            value = [i];
          } else {
            if (value.includes(i)) {
              value = value.filter((c) => c != i);
            } else {
              value = value.concat(i);
            }
          }
          dispatch("change", value);
        }}
      >
        {#if type == "icon"}
          <svelte:component this={component} strokeWidth={1.5} />
        {:else}
          <div>{component}</div>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style lang="postcss">
  .entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @apply text-gray-700 gdark:text-gray-300;
    .select {
      display: flex;
      font-weight: 600;
      font-size: 16px;

      .option {
        border-width: 1px;
        flex: 1;
        @apply px-2;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        @apply border-gray-300 gdark:border-gray-650 transition-all;
        @apply bg-gray-150 gdark:bg-gray-800;
        &.selected {
          @apply bg-white gdark:bg-gray-700;
          @apply text-primary-500 gdark:text-secondary;
        }
        &:hover {
          @apply border-gray-500 text-gray-900 gdark:text-gray-50 gdark:border-gray-550;
        }
        &:focus {
          @apply border-primary-500 text-primary-500 gdark:border-secondary gdark:text-secondary;
        }
        &:first-of-type {
          @apply rounded-l-md;
        }
        &:last-of-type {
          @apply rounded-r-md;
        }
      }
      &.out {
        width: 150px;
        display: flex;
        justify-content: center;
        @apply text-gray-900;
      }
    }
  }
</style>
