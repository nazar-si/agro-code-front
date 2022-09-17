<script>
  import Form from "$lib/components/Form.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Password from "$lib/components/ui/Password.svelte";
  import { At, Lock } from "tabler-icons-svelte";
</script>

<Form title="Регистрация">
  <Input placeholder="Почта" label="Почта"
    ><div slot="icon"><At size={20} /></div></Input
  >
  <Password placeholder="Пароль" label="Пароль"
    ><div slot="icon"><Lock size={20} /></div></Password
  >
  <Password placeholder="Повтор пароля" label="Повтор пароля"
    ><div slot="icon"><Lock size={20} /></div></Password
  >
  <button>Зарегистрироваться</button>
  <a href="/login" class="tip">Перейти ко входу</a>
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
