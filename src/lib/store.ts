import { writable } from 'svelte/store'

export const modeStore = writable<'similiar' | 'parameters' | 'profi'>('similiar')
export const mapStore = writable<number[][]>([])
export const mapParametersStore = writable<{size: number, top_left_coords: {x: number, y: number}}>()