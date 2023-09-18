---
sidebar_position: 1
---

# Template Literal

Template literal types build on string literal types, and have the ability to expand into many strings via unions.

They have the same syntax as template literal strings in JavaScript, but are used in type positions. When used with concrete literal types, a template literal produces a new string literal type by concatenating the contents.

We can create the template literal and even combine them like so (which can be very powerful 💪
):

```typescript
type ChessLetter = 'A' | 'B' | 'C';

type ChessNumber = 1 | 2 | 3;

type Board = `${ChessLetter}${ChessNumber}`;

//doesn't work!
const move: Board = '1';
//doesn't work!
const move: Board = '1A';
//only this works!
const move: Board = 'A1';
```

So what do we get from this ? The **explicit** format which we use to define a union type is of major importance.

## Another example

CSS purists will shout at me 😩 but useful for [Styled Components 💅](https://github.com/styled-components/styled-components) / [MUI Emotion](https://mui.com/material-ui/guides/interoperability/) / [ Panda CSS 🐼](https://github.com/chakra-ui/panda)

```typescript
type RgbCssString = `rgb(${number}, ${number}, ${number})`;

const rgb: RgbCssString = 'rgb(255, 255, 255)';
```

## TS Compile Safety

Let's create a file `getCountryLocation.ts`:

```typescript
type Locations = 'Greece' | 'Italy' | 'Spain';

//lose compile run-time safety
function getCountryLocation(country: Locations) {
  switch (country) {
    case 'Greece':
      return 'Europe';
    case 'Italy':
      return 'Europe';
    //doesn't cause error if we forget 'Spain' !
  }
}
```

The problem here is that we're losing compile time safety! Impure function usage! Double red flags! 👻

How can we fix this? We can use the negating type `never` which cannot be assigned anything!

```typescript
type Locations = 'Greece' | 'Italy' | 'Spain';

//lose compile run-time safety
function getCountryLocation(country: Locations) {
  switch (country) {
    case 'Greece':
      return 'Europe';
    case 'Italy':
      return 'Europe';
    //error if we forget 'Spain' !
    default:
      const exhaustiveCheck: never = country;
      throw new Error(`Unknown country ${exhaustiveCheck}`);
  }
}
```

Now this causes the error `string is not assignable to never`... why is that ? because we expect to get a string as a response but we got never instead!
