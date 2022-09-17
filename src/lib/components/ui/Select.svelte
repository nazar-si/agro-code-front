<script>
  export let label = "";
  export let items;
  export let isMulti = false;
  export let placeholder = "";
  export let dark = false;
  import color from "$lib/color";
  import Select from "svelte-select";
</script>

<div
  class="multiselect"
  style:--border={dark ? "1px solid #333" : "1px solid #ddd"}
  style:--background={dark ? "#18181c" : "#fff"}
  style:--borderHoverColor={dark ? "#555" : "#aaa"}
  style:--borderFocusColor={dark ? color.accent : color.primary}
  style:--listBackground={dark ? "#18181c" : "#fff"}
  style:--listBorder={dark ? "1px solid #333" : "1px solid #ddd"}
  style:--itemHoverBG={dark ? "#34d39966" : "#d3e6d9"}
  style:--multiItemBG={dark ? "#34d39933" : "#d3e6d9"}
  style:--multiItemActiveBG={dark ? color.accent + "cc" : color.primary}
  style:--multiClearBG={dark ? "#fff8" : "#0104"}
  style:--multiClearFill={dark ? "#343" : "#fff"}
  style:--multiClearHoverFill={dark ? "#000" : "#000"}
>
  <label for="select">{label}</label>
  <Select id="select" {items} {placeholder} {isMulti} />
</div>

<style lang="postcss">
  .multiselect {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @apply text-gray-700 gdark:text-gray-300;
    --borderRadius: 0.5rem;
    --listBorderRadius: 0.5rem;
    --multiItemPadding: 0 0.5rem;
  }
</style>
