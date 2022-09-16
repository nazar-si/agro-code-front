<script lang="ts">
  export let icon = undefined;
  export let label = "";
  export let description = "";
  export let value = "";
  export let placeholder = "";
</script>

<div class="frame">
  <label for="input" class="label">
    <div class="title">{label}</div>
    <div class="description">{description}</div>
  </label>
  <label for="input" class="input">
    {#if icon}
      <div class="icon"><svelte:component this={icon} size={20} /></div>
    {/if}
    <input
      id="input"
      type="text"
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
    @apply rounded-md flex gap-3 text-sm px-2 border-1 mb-4 mt-2;
    @apply bg-white border-gray-300;
    @apply gdark:bg-gray-850 gdark:border-gray-700;
    .icon {
      @apply text-gray-400 gdark:text-gray-500;
      @apply transition-all;
    }
    &:focus-within {
      box-shadow: 0 0 8px var(--primary-502);
      @apply border-primary-500;
      .icon {
        @apply text-primary-500;
      }
    }
  }
  .label {
    .title {
      @apply mb-1 mt-2 font-medium text-gray-700 gdark:text-gray-100;
    }
    .description {
      @apply text-sm text-gray-500 gdark:text-gray-400;
    }
  }
</style>
