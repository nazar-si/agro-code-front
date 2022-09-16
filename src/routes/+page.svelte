<script lang="ts">
  let dark = false;
  import { Moon, Sun } from "tabler-icons-svelte";
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
</style>
