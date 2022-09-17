<script lang="ts">
	import { loginAPI, registerAPI, setUserVinoyardsAPI,  getUserVinoyardsAPI, getMapAPI} from '$lib/client';
    import { onMount } from 'svelte';
    onMount(() => {
        // loginAPI('al1en', '314159al1en')
        // console.log(localStorage.getItem('token'))
        // getUserVinoyardsAPI()
        getMapAPI(1, [{x: 200, y: 200}, {x: 600, y: 600}], [{x: 500, y: 500}, {x: 505, y: 510}])
    })
</script>