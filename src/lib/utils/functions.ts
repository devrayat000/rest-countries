import type { Currencies, Languages, NativeName } from '$lib/interfaces/country';

export function extractCurrencies(currencies: Currencies) {
	return mapToArray(currencies, (item) => item.name);
}

export function extractLanguages(languages: Languages) {
	return mapToArray(languages, (item) => item);
}

export function extractNativeName(nativeName: NativeName) {
	return mapToArray(nativeName, (item) => item.common);
}

export function mapToArray<T, R>(
	object: Record<string, T>,
	callback: (item: T, key: string) => R
): R[] {
	const array: R[] = [];
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			const element = callback(object[key], key);
			array.push(element);
		}
	}

	return array;
}
