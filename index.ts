import plugin from 'tailwindcss/plugin.js';
import { createModifierParser } from '@toolwind/v4-modifier-parser';

// using empty values here so the compiler plays nice and generates the styles without values
const EMPTY_VALUES = { values: { DEFAULT: '' } };
const join = (...args: Array<string>) => args.filter(Boolean).join('-');

const sides: Record<string, Array<string>> = {
  '': [''],
  s: ['start-start', 'end-start'],
  e: ['start-end', 'end-end'],
  t: ['top-left', 'top-right'],
  r: ['top-right', 'bottom-right'],
  b: ['bottom-right', 'bottom-left'],
  l: ['top-left', 'bottom-left'],
  ss: ['start-start'],
  se: ['start-end'],
  ee: ['end-end'],
  es: ['end-start'],
  tl: ['top-left'],
  tr: ['top-right'],
  br: ['bottom-right'],
  bl: ['bottom-left'],
};

const cornerShapeStaticKeywords: Array<string> = ['round', 'scoop', 'bevel', 'notch', 'square', 'squircle'];
const cornerShapeFunctionalKeywords: Array<string> = ['superellipse'];

export default plugin((api) => {
  // create a Tailwind CSS version-agnostic modifier parser
  const parseModifier = createModifierParser(api);

  const { addUtilities, matchUtilities } = api;
  for (const [cornerShorthand, corners] of Object.entries(sides)) {
    const utilityPrefix = join('corner', cornerShorthand);
    for (const corner of corners) {
      // static keywords
      for (const keyword of cornerShapeStaticKeywords) {
        addUtilities({
          [`.${utilityPrefix}-${keyword}`]: {
            [join('corner', corner, 'shape')]: keyword,
          },
        });
      }
      // functional values (accepts percentage argument, e.g. corner-superellipse/50)
      // for (const keyword of cornerShapeFunctionalKeywords) {
      //   matchUtilities(
      //     {
      //       [`${utilityPrefix}-${keyword}`]: (_: any, { modifier }: { modifier: string | null }) => {
      //         if (!modifier) {
      //           console.error(`Invalid modifier: ${modifier}`);
      //           throw new Error(`Invalid modifier: ${modifier}`);
      //         }
      //         const value = parseModifier(modifier);
      //         if (!value) {
      //           console.error(`Invalid value: ${value}`);
      //           throw new Error(`Invalid value: ${value}`);
      //         }
      //         throw new Error(`MADE IT THIS FAR! ${JSON.stringify({ modifier, value, keyword, corner }, null, 2)}`);
      //         return {
      //           [join('corner', corner, 'shape')]: `${keyword}(${value})`,
      //         };
      //       },
      //     },
      //     {
      //       ...EMPTY_VALUES,
      //       modifiers: 'any',
      //     }
      //   );
      // }
    }
  }
});
