import plugin from 'tailwindcss/plugin.js';

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

export default plugin(({ addUtilities, matchUtilities }) => {
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
      for (const keyword of cornerShapeFunctionalKeywords) {
        const allowlistedValues = ['e', 'infinity', 'pi'].flatMap((v) => [v, `-${v}`]);
        matchUtilities(
          {
            [`${utilityPrefix}-${keyword}`]: (_, { modifier: value }) => {
              if (!value || (isNaN(Number(value)) && !allowlistedValues.includes(value))) return {};
              return {
                [join('corner', corner, 'shape')]: `${keyword}(${value})`,
              };
            },
          },
          {
            ...EMPTY_VALUES,
            modifiers: 'any',
          }
        );
      }
    }
  }
});
