<h1 align="center">
  <a href="https://tailwindcss.com" target="_blank">
    <picture>
      <img alt="Toolwind Corner Shape" src="https://raw.githubusercontent.com/toolwind/corner-shape/HEAD/.github/logo.png" width="350" height="auto" style="max-width: 100%;">
    </picture>
  </a>
</h1>

<div align="center">

[![minified size](https://img.shields.io/bundlephobia/min/@toolwind/corner-shape)](https://bundlephobia.com/package/@toolwind/corner-shape)
[![license](https://img.shields.io/github/license/toolwind/corner-shape?label=license)](https://github.com/toolwind/corner-shape/blob/main/LICENSE)
[![version](https://img.shields.io/npm/v/@toolwind/corner-shape)](https://www.npmjs.com/package/@toolwind/corner-shape)
[![twitter](https://img.shields.io/twitter/follow/branmcconnell)](https://twitter.com/branmcconnell)

</div>

Tailwind CSS plugin that adds first-class utilities for the CSS `corner-shape` property and its per-corner longhands (e.g. `corner-top-left-shape`). It supports static keywords like `round`, `scoop`, `bevel`, `notch`, `square`, `squircle`, as well as the functional value `superellipse(<value>)`.

## Installation

You can install the plugin via npm:

```bash
npm install @toolwind/corner-shape
```

Then, include it in your `tailwind.config.js`:

```js
module.exports = {
  plugins: [
    require('@toolwind/corner-shape'),
  ]
}
```

## Usage

- **All corners at once**: `corner-{shape}`
- **Physical edges (two corners at a time)**:
  - `corner-t-{shape}` → top-left and top-right
  - `corner-r-{shape}` → top-right and bottom-right
  - `corner-b-{shape}` → bottom-right and bottom-left
  - `corner-l-{shape}` → top-left and bottom-left
- **Physical single corners**:
  - `corner-tl-{shape}`, `corner-tr-{shape}`, `corner-br-{shape}`, `corner-bl-{shape}`
- **Logical edges (writing-direction aware)**:
  - `corner-s-{shape}` → start-start and end-start
  - `corner-e-{shape}` → start-end and end-end
- **Logical single corners**:
  - `corner-ss-{shape}`, `corner-se-{shape}`, `corner-ee-{shape}`, `corner-es-{shape}`

Supported static shapes: `round`, `scoop`, `bevel`, `notch`, `square`, `squircle`

```html
<div class="
  corner-round
  md:corner-t-bevel
  lg:corner-tr-notch
">
</div>
```

## Functional value: `superellipse`

Use Tailwind’s modifier syntax (`/`) to pass a `superellipse(<value>)` parameter:

- `.corner-superellipse/50`
- `.corner-t-superellipse/32`
- `.corner-tr-superellipse/e`
- `.corner-s-superellipse/-pi`

Accepted values are:
- a number (e.g. `2`, `0.5`, `-1`)
- one of the constants: `e`, `pi`, `infinity` (optionally negative: `-e`, `-pi`, `-infinity`)

Examples:

```html
<div class="corner-superellipse/1.5"></div>
<div class="corner-br-superellipse/pi"></div>
<div class="corner-e-superellipse/-infinity"></div>
```

Notes:
- Values are passed through as-is to `superellipse(<value>)`. Do not include units.
- Logical shorthands (`s`, `e`, `ss`, `se`, `ee`, `es`) adapt with writing direction.

## Keyword equivalents

| Keyword  | Description                                                                 | Equivalent |
|----------|-----------------------------------------------------------------------------|------------|
| bevel    | Defines a straight, diagonal corner, which is neither convex nor concave.  | `superellipse(0)` |
| notch    | Defines a 90-degree concave square corner.                                  | `superellipse(-infinity)` |
| round    | Defines a convex ordinary ellipse; the standard rounded corner created by `border-radius` without `corner-shape`. This is the default (initial) value. | `superellipse(1)` |
| scoop    | Defines a concave ordinary ellipse.                                         | `superellipse(-1)` |
| square   | Defines a 90-degree convex square corner; the default shape when no `border-radius` (or `border-radius: 0`) is applied. | `superellipse(infinity)` |
| squircle | Defines a “squircle”, a convex curve in between round and square.           | `superellipse(2)` |

## Complete utility reference

- **All corners**
  - `corner-{shape}`
  - `corner-superellipse/{value}`
- **Edges (physical)**
  - `corner-{t|r|b|l}-{shape}`
  - `corner-{t|r|b|l}-superellipse/{value}`
- **Corners (physical)**
  - `corner-{tl|tr|br|bl}-{shape}`
  - `corner-{tl|tr|br|bl}-superellipse/{value}`
- **Edges (logical)**
  - `corner-s-{shape}`, `corner-e-{shape}`
  - `corner-{s|e}-superellipse/{value}`
- **Corners (logical)**
  - `corner-{ss|se|ee|es}-{shape}`
  - `corner-{ss|se|ee|es}-superellipse/{value}`

Where `{shape}` is one of `round`, `scoop`, `bevel`, `notch`, `square`, `squircle`.

## Variants and composition

All standard Tailwind variants work:

```html
<button class="hover:corner-s-squircle focus:corner-br-bevel"></button>
```

## Browser support

This plugin emits the `corner-shape` and `corner-*-shape` properties. Support for these properties varies by browser and may change over time. Consider providing design fallbacks (e.g. `border-radius`) where necessary.

## Learn more

- [MDN: corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape)
- [Understanding CSS corner-shape and the power of the superellipse](https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/)

---

I hope you find `@toolwind/corner-shape` a valuable addition to your projects. If you have any issues or suggestions, don't hesitate to open an issue or pull request.

If you liked this, you might also like my other Tailwind CSS plugins:
* [tailwindcss-multi](https://github.com/brandonmcconnell/tailwindcss-multi): Group utilities together by variant
* [tailwindcss-signals](https://github.com/brandonmcconnell/tailwindcss-signals): Apply styles based on parent or ancestor state, a state-driven alterative to groups
* [tailwindcss-members](https://github.com/brandonmcconnell/tailwindcss-members): Apply styles based on child or descendant state, the inverse of groups
* [tailwindcss-mixins](https://github.com/brandonmcconnell/tailwindcss-mixins): Construct reusable & aliased sets of utilities inline
* [tailwindcss-selector-patterns](https://github.com/brandonmcconnell/tailwindcss-selector-patterns): Dynamic CSS selector patterns
* [tailwindcss-js](https://github.com/brandonmcconnell/tailwindcss-js): Effortless build-time JS script injection
* [tailwindcss-directional-shadows](https://github.com/brandonmcconnell/tailwindcss-directional-shadows): Supercharge your shadow utilities with added directional support (includes directional `shadow-border` utilities too)
* [tailwindcss-default-shades](https://github.com/brandonmcconnell/tailwindcss-default-shades): Default shades for simpler color utility classes
* [tailwind-lerp-colors](https://github.com/brandonmcconnell/tailwind-lerp-colors): Expand your color horizons and take the fuss out of generating new—or expanding existing—color palettes