---
sidebar_position: 1
---

# As Const

Introduced in TS 3.4 `as const` is a TypeScript feature that narrows down the type of a value to its most specific, literal form. It ensures that the value is treated as immutable by TypeScript's type system, but it does not enforce runtime immutability.

Essentially it converts values to readonly types at the type level.

## Motivation

Why do we need it ?

In regular JS objects and arrays if declared as const are not **re-assignable** however they
are indeed **mutable**...

```typescript
const config = {
  name: 'name',
  lastName: 'lastName',
};

config.name = 'whatever'; //Applicable!
```

## Examples

But if we changed it to as const it's no longer applicable anymore and we're protected by TS (compile time only)!

```typescript
const config = {
  name: 'name',
  lastName: 'lastName',
} as const;

config.name = 'whatever'; //Cannot assign to 'name' because it is a read-only property
```

It can also go multiple levels deep!

```typescript
const config = {
  name: 'name',
  lastName: 'lastName',
  themePreferences: {
    mode: 'dark',
  },
} as const;

config.themePreferences.mode = 'light'; //Similar error here
```

## Difference of `as const` (TS) and `Object.freeze` (JS)

If you've been into JS ecosystem for a while you probably have encountered `Object.freeze` which does a similar way but on Vanilla JS but there are key differences:

| Feature                      | as const (TS)              | Object.freeze (JS)   |
| ---------------------------- | -------------------------- | -------------------- |
| Purpose                      | Type-level immutability    | Runtime immutability |
| Works with nested properties | Multi Level (compile time) | Single Level         |
| Runtime Impact               | ❌                         | ✅                   |
