<script>
  export let active = false;
  export let label = "";
</script>

<button
  class="wrapper"
  on:click={() => {
    active = !active;
  }}
>
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <div class="button" class:active>
    <div class="thumb" />
  </div>
</button>

<style lang="postcss">
  .wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    outline: none;
    .button {
      width: 40px;
      height: 24px;
      @apply rounded-xl;
      @apply border-2 border-gray-200;
      @apply flex items-center transition-all;
      padding: 2px;
      .thumb {
        height: 16px;
        width: 16px;
        @apply bg-gray-300 rounded-xl;
      }
      &.active {
        padding-left: 18px;
        @apply bg-primary-502;
        @apply border-primary-500;
        .thumb {
          @apply bg-primary-500;
        }
      }
    }
    .label {
      @apply text-gray-500;
    }
    &:focus-within {
      .label {
        @apply text-primary-500;
      }
    }
  }
</style>
