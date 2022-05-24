import type { Currencies, Languages } from '$lib/interfaces/country';

export function extractCurrencies(currencies: Currencies) {
	return mapToArray(currencies, (item) => item.name);
}

export function extractLanguages(languages: Languages) {
	return mapToArray(languages, (item) => item);
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
