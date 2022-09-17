<script lang="ts">
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Password from "$lib/components/ui/Password.svelte";
  import { At, Lock } from "tabler-icons-svelte";

  let login = "";
  let password = "";
  let password_repeat = "";
  let error = false;

  import { registerAPI } from "$lib/client";
  let auth = false;
</script>

<Form
  title="Регистрация"
  on:submit={(e) => {
    e.preventDefault();
    if (password !== password) {
      error = true;
      return;
    }
    registerAPI(login, password);
    auth = true;
  }}
>
  {#if !auth}
    <Input placeholder="login" label="login" bind:value={login} {error}
      ><div slot="icon"><At size={20} /></div></Input
    >
    <Password placeholder="Пароль" label="Пароль" bind:value={password} {error}
      ><div slot="icon"><Lock size={20} /></div></Password
    >
    <Password
      placeholder="Повтор пароля"
      label="Повтор пароля"
      bind:value={password_repeat}
      ><div slot="icon"><Lock size={20} /></div></Password
    >
    <button>Зарегистрироваться</button>
    <a href="/login" class="tip">Перейти ко входу</a>
  {:else}
    <button><a href="/">Далее</a></button>
  {/if}
</Form>

<style lang="postcss">
  button {
    @apply bg-primary-500 text-gray-50 font-semibold text-base rounded-md p-1 mt-4;
  }
  .tip {
    text-align: center;
    @apply text-sm -mt-2 text-gray-500 hover:text-primary-400;
  }
</style>
