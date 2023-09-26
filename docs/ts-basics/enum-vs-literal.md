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
  A = 1,
  B = 2,
}

enum Option2 {
  C = 3,
}

const mixOfOptions = {
  ...Option1,
  ...Option2,
} as const;

//merge is hard, don't get the actual literal values!
type Options = typeof mixOfOptions;
```

Best used when too many API contracts are involved for example Playwright, Jest, React stuff and so on.

## Literal

### Usage Example

```typescript
type Option1 = 1 | 2;

type Option2 = 3;

//merge
type Options = Option1 | Option2;
```

Completely reverse of Enum they aggragate information not as string but as their own special type and they result in much less code when transpiled in JS thus better end result performance.

## Pros & Cons 📋

| Purpose                 | Enum type | Literal type |
| ----------------------- | --------- | ------------ |
| Muli API OOB            | ✅        | ❌           |
| Combination flexibility | ❌        | ✅           |
| Less JS transpiled      | ❌        | ✅           |
| Merge Allowed           | ❌        | ✅           |
| Clear Semantics         | ✅        | ❌           |
| Fix Set of Values       | ✅        | ✅           |
| Needs Import            | ✅        | ❌           |

### Biggest Reason to go with Enum

Because Literal types are very explicit this would mean that we would have to re-write everything under the Literal way paradigm if much infra is coupled to our code.

Enums are basically strings but Literal types are not!
