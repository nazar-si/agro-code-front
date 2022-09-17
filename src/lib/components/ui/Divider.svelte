<script lang="ts">
  import { Underline } from "tabler-icons-svelte";

  export let darker = false;
  export let m = 0;
  export let mb = undefined;
  export let mt = undefined;
  export let mx = 0;
  export let nogap = false;
  export let align: "left" | "center" | "right" = "center";
</script>

<div
  class="wrapper"
  class:nogap
  style:margin="{m / 4}rem {mx / 4}rem"
  style:margin-bottom="{mb / 4}rem"
  style:margin-top="{mt / 4}rem"
>
  <div class="divider" style:flex={align == "left" ? 0 : 1} class:darker />
  <div class="title"><slot /></div>
  <div class="divider" style:flex={align == "right" ? 0 : 1} class:darker />
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    width: auto;
    gap: 0.25rem;
    .divider {
      height: 1px;
      width: 100%;
      min-width: 1rem;
      @apply bg-gray-200 gdark:bg-gray-700;
      &.darker {
        @apply bg-gray-300 gdark:bg-gray-600;
      }
    }
    .title {
      transform: translateY(-50%);
      margin-bottom: -16px;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      @apply text-gray-450 gdark:text-gray-500;
      cursor: default;
      transition: 0.15s;
    }
    &.nogap {
      gap: 0;
    }
  }
  .wrapper:hover {
    .title {
      @apply text-secondary-500;
    }
    .divider {
      @apply bg-secondary-500;
    }
  }
</style>
