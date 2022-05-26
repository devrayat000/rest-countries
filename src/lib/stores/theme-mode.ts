import { writable, type Updater } from 'svelte/store';

export type ThemeMode = 'light' | 'dark';

function createThemeStore(key: string, initial?: ThemeMode) {
	const { set, subscribe, update } = writable<ThemeMode>(initial);

	return {
		subscribe,
		set(this: void, value: ThemeMode) {
			localStorage.setItem(key, value);
			set(value);
		},
		update(this: void, updater: Updater<ThemeMode>) {
			update((prev) => {
				const value = updater(prev);
				localStorage.setItem(key, value);
				return value;
			});
		},
		initialize() {
			const stored = localStorage.getItem(key);
			if (stored) {
				set(stored as ThemeMode);
			} else if (initial) {
				localStorage.setItem(key, initial);
			}
		}
	};
}

export const themeMode = createThemeStore('countries.theme', 'light');
