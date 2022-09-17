<script lang="ts">
	import { loginAPI, registerAPI, setUserVinoyardsAPI,  getUserVinoyardsAPI} from '$lib/client';
    import { onMount } from 'svelte';
    onMount(() => {
        // loginAPI('al1en', '314159al1en')
        // console.log(localStorage.getItem('token'))
        getUserVinoyardsAPI()
    })
</script>