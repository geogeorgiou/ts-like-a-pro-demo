---
sidebar_position: 7
---

# Enum vs Literal

- Enum (short for "enumeration") is a data type that allows you to define a set of named values. Enums are used to represent a set of related constants or options in a more human-readable and self-documenting way. They make your code more expressive and less error-prone by giving meaningful names to numeric values.

- Literal types in TypeScript allow you to specify exact values that a variable or parameter can have. They are a subset of TypeScript's union types and provide type safety by ensuring that a variable can only hold one of a predefined set of values. Literal types are denoted by using specific values as types.

## Enum

### Usage Example

```typescript
enum Option1 {
  A = '1',
  B = '2',
}

enum Option2 {
  C = '3',
}

//merge doesn't get the actual literal values!
type Options = Option1 | Option2;

//Type '"1"' is not assignable to type 'Options'...
const option: Options = '1';

//this works!
const option: Option = Option1.A;
```

Best used when too many API contracts are involved for example Playwright, Jest, React stuff and so on.

### Deep dive into transpiled JS code

Now lets take a look at the generated JS code for the first enum

```javascript
var Option1;
(function (Option1) {
  Option1['A'] = 'foo';
  Option1['B'] = 'bar';
})(Option1 || (Option1 = {}));
```

## Literal

### Usage Example

```typescript
type Option1 = '1' | '2';

type Option2 = '3';

//merge
type Options = Option1 | Option2;

//works out of the box
const option: Options = '1';
```

Completely reverse of Enum they aggragate information not as string but as their own special type and they don't create overhead when transpiled in JS thus implying better end result performance.

### A Literal caveat

Hope you liked my pun there.. 😅 So what happens if we use literals inside of objects? TS is having a hard time inferring them and that could cause some issues when using props hence objects and attempting to manipulate them before actually passing them to a component.

Let's see how that works

```typescript
//...using the literal `Options` definition from above

const val = {
  val: 'insert text here',
  num: '1',
};

function calculateX(val: { val: string; num: Options }) {
  // ...todo
}

//Types of property 'num' are incompatible.
//TS expected a literal here! (fix this by casting val `as const`)
calculateX(val);

//but this works! 🫡
calculateX({
  val: 'add another text',
  num: '2',
});
```

## Pros & Cons 📋

| Purpose                 | Enum type | Literal type |
| ----------------------- | --------- | ------------ |
| Intellisense            | ✅        | ✅           |
| Muli API OOB            | ✅        | ❌           |
| JS transpiled overhead  | ✅        | ❌           |
| Literal Merge Allowed   | ❌        | ✅           |
| Clear Semantics         | ✅        | ❌           |
| Fix Set of Values       | ✅        | ✅           |
| Combination flexibility | ❌        | ✅           |
| Needs Import            | ✅        | ❌           |
| Needs Casting           | ❌        | ✅           |

### Biggest Reason to go with Enum 👍

Because Literal types are very explicit this would mean that we would have to re-write everything under the Literal way paradigm if much infra is coupled to our code.

Enums are basically strings but Literal types are not!
