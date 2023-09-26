---
sidebar_position: 3
---

# Type Guards 💂

In TypeScript, type guards are a way to narrow down the type of a variable or value within a certain code block. They are particularly useful when working with union types or when dealing with types that have common properties.

Let's start off by defining some types:

```typescript
type CheckboxProps = {
  type: 'checkbox';
  checked: boolean;
};

type TextProps = {
  type: 'text';
  value: string;
};

type RadioProps = {
  type: 'radio';
  selected: boolean;
};

//all of them can constitute a more broad type (also called Descriminated union)
//discriminant being the `type` prop here
type InputProps = CheckboxProps | TextProps | RadioProps;
```

Type guards allow you to make more specific type assertions based on runtime checks.

```typescript
function isCheckbox(input: InputProps): input is CheckboxProps {
  return input.type === 'checkbox';
}

function isText(input: InputProps): input is TextProps {
  return input.type === 'text';
}

function isRadio(input: InputProps): input is RadioProps {
  return input.type === 'radio';
}

// let's use these type guards to narrow down the type of input!
function consoleLogPerType(input: InputProps) {
  if (isCheckbox(input)) {
    // TS nags that Property 'selected' does not exist on type 'CheckboxProps'
    console.log(input.selected);
  } else if (isText(input)) {
    // ...
  } else {
    // TS infers that input: RadioProps!
  }
}
```

# Discriminated Union

In TypeScript, a discriminated union (also known as a tagged union or algebraic data type) is a type that combines multiple other types using a common property, known as a discriminant property. This discriminant property is used to determine which specific type within the union is currently in use. Discriminated unions are commonly used in React applications when dealing with components that can have different states or variations.

```typescript
import React from 'react';

// Let's make a dynamic render based on type
function renderInput(input: InputProps): JSX.Element {
  switch (input.type) {
    case 'checkbox':
      // input.selected doesn't exist for type checkbox!
      return <input type='checkbox' checked={input.selected} />;
    case 'text':
      return <input type='text' value={input.value} />;
    case 'radio':
      return <input type='radio' checked={input.selected} />;
  }
}

// same type safety applies on function call level!
renderInput({ type: 'checkbox', selected: true });
```

This can be extended further on! 🤯 for more customisation if we want to have some descriminants have more or different attributes but this would require that we have to use type-guards to narrow down props into our specific case 🤔...

# Final Notes:

- Use type guards to narrow down the type of input of descriminated unions together if the props complexity is increased e.g. different function calls based on type of input
- Descriminated unions work both inside and outside of function calls providing robust type safe code 💪 but the descriminant as of this moment **can only be a literal type (TS 5.0).**
