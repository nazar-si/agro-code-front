<script>
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Password from "$lib/components/ui/Password.svelte";
  import { At, Lock } from "tabler-icons-svelte";

  let email = "";
  let password = "";
  let error = false;
</script>

<Form title="Вход" on:submit={(e) => e.preventDefault()}>
  <Input placeholder="Почта" label="Почта" bind:value={email} {error}
    ><div slot="icon"><At size={20} /></div></Input
  >
  <Password placeholder="Пароль" label="Пароль" bind:value={password} {error}
    ><div slot="icon"><Lock size={20} /></div></Password
  >
  <button>Войти</button>
  <a href="/signup" class="tip">Перейти к регистрации</a>
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
