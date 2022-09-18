import { writable } from 'svelte/store'
import { selectedCoord } from './stores/grid'


export const modeStore = writable<'similiar' | 'parameters' | 'profi'>('similiar')
export const mapStore = writable<number[][]>([])
export const mapParametersStore = writable<{size: number, top_left_coords: {x: number, y: number}}>()
export const scaleStore = writable<1 | 8 | 32>(1)
export const pixelsStore = writable<{x: number, y: number}[]>([])
export const cornersStore = writable<[{x: number, y: number}, {x: number, y: number}]>()

selectedCoord.subscribe((value) => {
    let temp = []
    value.forEach(coord => {
        temp.push({
            x: coord[0],
            y: coord[1]
        })
    })
    pixelsStore.set(temp)
})