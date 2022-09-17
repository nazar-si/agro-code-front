<script>
  import Switch from "./ui/Switch.svelte";
  import Multiple from "./ui/Multiple.svelte";
  import Input from "./ui/Input.svelte";
  import Divider from "./ui/Divider.svelte";
  import { Moon, Sun } from "tabler-icons-svelte";
  import Select from "svelte-select";
  export let dark = false;
  let vines = [
    { label: "Совиньон", value: 0 },
    { label: "Каберне Фран", value: 1 },
    { label: "Мерло", value: 2 },
    { label: "Пино Нуар", value: 3 },
    { label: "Карменер", value: 4 },
    { label: "Сира", value: 5 },
    { label: "Гренаш", value: 6 },
    { label: "Саперави", value: 7 },
    { label: "Шардоне", value: 8 },
    { label: "Мускат", value: 9 },
    { label: "Совиньон Блан", value: 10 },
  ];
</script>

<div class="wrapper">
  <div class="row">
    <button
      class="theme"
      on:click={() => {
        dark = !dark;
        dark
          ? document.body.classList.add("dark")
          : document.body.classList.remove("dark");
      }}
    >
      {#if dark}<Moon size={20} />{:else}<Sun size={20} />{/if}
    </button>
    <h3>Agro code</h3>
  </div>
  <Divider align="left">Основные параметры</Divider>
  <Multiple
    type="text"
    components={["Юг", "Север"]}
    label="Направление"
    check
  />
  <div
    class="multiselect"
    style:--border={dark ? "1px solid #333" : "1px solid #aaa"}
    style:--background={dark ? "#18181c" : "#fff"}
  >
    <label for="vines">Сорта винограда</label>
    <Select id="vines" items={vines} placeholder="Сорта винограда..." isMulti />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @apply p-2;
    .row {
      @apply flex items-center;
    }
    h3 {
      flex: 1;
      width: 100%;
      text-align: center;
      @apply pr-8;
      @apply my-3 text-lg;
    }
    .theme {
      @apply w-8 h-8 flex items-center justify-center border-1 border-gray-300 rounded-md gdark:border-gray-600;
    }
    .multiselect {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      @apply text-gray-700 gdark:text-gray-300;
      --borderRadius: 0.5rem;
    }
  }
</style>
