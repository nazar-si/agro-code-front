<script>
  export let title = "Форма";
  export let action = "";
</script>

<div class="wrapper">
  <form on:submit tabindex={-1}>
    <h3>{title}</h3>
    <slot />
  </form>
</div>

<style lang="postcss" action="">
  .wrapper {
    width: 100%;
    height: 100vh;
    @apply flex items-center justify-center;
    @apply bg-gray-200;
    form {
      min-width: 300px;
      @apply p-6 bg-gray-100 border-1 border-gray-300 shadow-main-sm rounded-md transition-all;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      /* box-shadow: 0 0 0 #0000; */
      &:focus-within {
        @apply border-accent-500;
      }
      h3 {
        @apply border-b-1 border-gray-250 pb-4;
        @apply text-xl;
        text-align: center;
      }
    }
  }
</style>
