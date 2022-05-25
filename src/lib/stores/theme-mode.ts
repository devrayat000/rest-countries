import { writable } from 'svelte/store';

export type ThemeMode = 'light' | 'dark';

export const themeMode = writable<ThemeMode>('light');
