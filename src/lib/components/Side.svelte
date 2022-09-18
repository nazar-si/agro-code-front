<script>
  import Switch from "./ui/Switch.svelte";
  import Multiple from "./ui/Multiple.svelte";
  import Input from "./ui/Input.svelte";
  import Divider from "./ui/Divider.svelte";
  import { Moon, Sun } from "tabler-icons-svelte";
  import color from "$lib/color";
  import { selectedCoord, selectedVal } from "$lib/stores/grid";
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
  let sugar = [
    { label: "Сухое", value: 0 },
    { label: "Полусухое", value: 1 },
    { label: "Полусладкое", value: 2 },
    { label: "Сладкое", value: 3 },
  ];
  import Select from "./ui/Select.svelte";
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
  <Divider align="left">Какая-то секция</Divider>
  <div class="row buttons">
    <button class="norm">Выбор по схожим полям</button>
    <button class="norm">Выбор по параметрам</button>
  </div>
  <Divider align="left">Основные параметры</Divider>
  <Multiple
    type="text"
    components={["Юг", "Север"]}
    label="Направление"
    check
  />
  <Multiple
    type="text"
    components={["Белое", "Красное"]}
    label="Цвет вина"
    check
  />
  <Select
    label="Содержание сахара"
    placeholder="Содержание сахара..."
    items={sugar}
    {dark}
    isMulti
  />
  <Select
    label="Сорта винограда"
    placeholder="Сорта винограда..."
    items={vines}
    {dark}
    isMulti
  />
  {#if $selectedCoord[0] !== null}
    <Divider align="left" mt={4}>Данные выбранной ячеки</Divider>
    <span>
      Положение:
      <span class="text-primary">{$selectedCoord[0]},{$selectedCoord[1]}</span>
      <br />
      <span />Индекс соответствия:
      <span class="text-primary">{$selectedVal}</span></span
    >
  {/if}
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @apply p-2;
    .row {
      @apply flex items-center;
      &.buttons {
        gap: 1rem;
      }
    }
    h3 {
      flex: 1;
      width: 100%;
      text-align: center;
      @apply pr-8;
      @apply my-2 text-lg;
    }
    .theme {
      @apply w-8 h-8 flex items-center justify-center border-1 border-gray-300 rounded-md gdark:border-gray-600;
    }
  }
  button.norm {
    @apply bg-primary-500 text-gray-50 font-semibold text-base rounded-md p-1 mt-1 mb-2 transition-all;
    @apply hover:bg-primary-400 gdark:hover:bg-primary-600;
  }
</style>
