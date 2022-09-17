import { writable } from 'svelte/store'

export const modeStore = writable<'similiar' | 'parameters' | 'profi'>('similiar')