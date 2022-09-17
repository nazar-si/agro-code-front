import { writable } from "svelte/store";

export const selectedCoord = writable([null, null]);
export const selectedVal = writable(0);