<script lang="ts">
  export let label = "";
  export let description = "";
  export let value = "";
  export let placeholder = "";
  export let m = 0;
  export let mx = 0;
  export let my = 0;
  export let mb = 0;
  export let mt = 0;
  export let error = false;
  import cuid from "cuid";
  let c = cuid();
</script>

<div
  class="frame"
  style:margin="{(my ? my : m) / 4}rem {(mx ? mx : m) / 4}rem"
  style:margin-bottom="{mb}rem"
  style:margin-top="{mt}rem"
  class:error
>
  <label for="input-{c}" class="label">
    <div class="title">{label}</div>
    <div class="description">{description}</div>
  </label>
  <label for="input-{c}" class="input">
    {#if $$slots.icon}
      <div class="icon"><slot name="icon" /></div>
    {/if}
    <input
      autocomplete="current-password"
      id="input-{c}"
      type="password"
      {placeholder}
      on:click
      on:change
      on:blur
      on:focus
      bind:value
    />
  </label>
</div>

<style lang="postcss">
  input {
    background: none;
    outline: none;
    border: none;
    flex: 1;
    &::placeholder {
      @apply text-gray-500;
    }
  }
  .input {
    cursor: text;
    align-items: center;
    height: 36px;
    transition: border 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 0 #0000;
    @apply rounded-md flex gap-3 text-sm px-2 border-1 mt-2;
    @apply bg-white border-gray-300;
    @apply gdark:bg-gray-850 gdark:border-gray-700;
    .icon {
      @apply text-gray-400 gdark:text-gray-500;
      @apply transition-all;
    }
    &:focus-within {
      box-shadow: 0 0 8px #34d39933;
      @apply border-accent-500;
      .icon {
        @apply text-accent-500;
      }
    }
  }
  .label {
    .title {
      @apply text-base mb-1 font-medium text-gray-700 gdark:text-gray-100;
    }
    .description {
      @apply text-sm text-gray-500 gdark:text-gray-400;
    }
  }
  .frame.error {
    .label {
      .title {
        @apply text-rose-500;
      }
      .description {
        @apply text-rose-500;
      }
    }
    .input {
      @apply border-rose-500;
      input::placeholder {
        @apply text-rose-500;
      }
      .icon {
        @apply text-rose-500;
      }
    }
  }
</style>
