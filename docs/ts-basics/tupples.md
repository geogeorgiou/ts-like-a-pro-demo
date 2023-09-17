---
sidebar_position: 2
---

# Tupples

A tuple is a typed array with a pre-defined length and types for each index.

Tuples are great because they allow each element in the array to be a known type of value.

To define a tuple, specify the type of each element in the array so we can use them to define a specific construct:

```typescript
type RgbConfig = [number, number, number];

const rgb: RgbConfig = [255, 255, 255];

//naturally operations as those are applicable!
rgb[0] = 1;
rgb.push(1);
```

## Immutable way definition

However there are some cases that we may not want that because we would like to be solid constructs.

```typescript
type RgbConfig = readonly [number, number, number];

const rgb: RgbConfig = [255, 255, 255];

//following operations not allowed anymore!
rgb[0] = 1;
rgb.push(1);
```

Can be very useful if we want to define a set of permissions for a user that we want to ensure that do not change on the type level.

But beware 🚨 like `union types` these may cause issues on test files because they are not simply an array but a `readonly` array.
