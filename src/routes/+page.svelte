<script lang="ts">
  let dark = false;
  import { Moon, Sun } from "tabler-icons-svelte";
  let width = 20;
  let height = 20;
</script>

<main>
  <button
    on:click={() => {
      dark = !dark;
      dark
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");
    }}
    >Theme {#if dark}<Moon />{:else}<Sun />{/if}</button
  >
  <button class="secondary">Secondary</button>
  <div class="label">Primary color</div>
  <div class="label secondary">Secondary color</div>
  <div class="grid" style:grid-template-columns="repeat({width}, 1fr)">
    {#each Array.from(Array(height).keys()) as i}
      {#each Array.from(Array(width).keys()) as j}
        <div
          class="entry"
          style:opacity={Math.abs(
            (Math.sin(j / 7 + 2) * Math.sin(i / 8 + 3)) / 2 +
              Math.sin(i / 3) * Math.cos(j / 3)
          ) +
            Math.random() / 7}
        />
      {/each}
    {/each}
  </div>
</main>

<style lang="postcss">
  button {
    display: flex;
    gap: 1rem;
    @apply transition-all;
    @apply m-4 p-2 rounded-md border-1 border-gray-350 gdark:border-gray-500 gdark:hover:border-primary hover:border-primary hover:text-primary;
  }
  button.secondary {
    @apply hover:border-secondary gdark:hover:border-secondary hover:!text-secondary;
  }
  .label {
    width: fit-content;
    @apply text-sm font-semibold text-white;
    @apply px-2 m-2 bg-primary rounded-2xl border-primary-600 gdark:border-primary-400;
    &.secondary {
      @apply bg-secondary border-secondary-600 gdark:border-secondary-400;
    }
  }
  .grid {
    display: grid;

    width: fit-content;
    gap: 0.25rem;
    margin: 0.5rem;
    padding: 0.5rem;
    @apply border-1 border-gray-300 gdark:border-gray-600 rounded-md;
    .entry {
      box-shadow: 0 0 0 #0000;
      @apply w-4 h-4 bg-primary gdark:bg-secondary-500 rounded-sm transition-all;
      @apply hover:!opacity-100 hover:bg-blue-500 gdark:hover:bg-blue-500;
      &:hover {
        box-shadow: 0 0 15px 3px #0084ff;
      }
    }
  }
</style>
