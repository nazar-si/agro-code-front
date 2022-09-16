<script lang="ts">
  import { Underline } from "tabler-icons-svelte";

  export let label = "";
  export let darker = false;
  export let m = 0;
  export let mb = undefined;
  export let mt = undefined;
  export let align: "left" | "center" | "right" = "center";
</script>

<div
  class="wrapper"
  class:label
  style:margin="{m / 4}rem 0"
  style:margin-bottom="{mb / 4}rem"
  style:margin-top="{mt / 4}rem"
>
  <div class="divider" style:flex={align == "left" ? 0 : 1} class:darker />
  <div class="title">{label}</div>
  <div class="divider" style:flex={align == "right" ? 0 : 1} class:darker />
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    width: 100%;
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
      @apply text-gray-400 gdark:text-gray-550;
    }
    &.label {
      gap: 0.25rem;
    }
  }
</style>
