# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Get search autocompletes
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![Desktop Home Light](./design/desktop-design-home-light.jpg)
![Desktop Details Light](./design/desktop-design-detail-light.jpg)

### Links

- Solution URL: [Source Code](https://github.com/devrayat000/rest-countries)
- Live Site URL: [Live Demo](https://every-country.netlify.app/)

## My process

### Built with

- [SvelteKit](https://kit.svelte.dev/) - JS Framework
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Svelte HeadlessUI](https://svelte-headlessui.goss.io/) - For Special Components
- [Svelte Heroicon](https://github.com/rgossiaux/svelte-heroicons) - For styles

### What I learned

The tricky part of this project was to fetch the info of the border countries of a perticular country. The response of country list comes as an array. Therefore, I had to reduce it:

```js
const borderCountryArray = country.borders.reduce(async (prev, border) => {
    const res = await fetch(
        `https://restcountries.com/v3.1/alpha/?codes=${border}&fields=name,ccn3`
    );
    const countries = await res.json();

    return [...(await prev), ...countries];
}, Promise.resolve([]));
```

### Continued development

- [x] Dark Mode
- [x] Search Autocomplete
- [ ] Google Map Location

## Author

- Website - [Zul Ikram Musaddik Rayat](https://devrayat.me/)
- Frontend Mentor - [@devrayat000](https://www.frontendmentor.io/profile/devrayat000)
- Twitter - [@RayatMusaddik](https://www.twitter.com/RayatMusaddik)
