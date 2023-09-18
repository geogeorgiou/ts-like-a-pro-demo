---
sidebar_position: 5
---

# Branded Type

Given a simple task to save a positive number to a database fairly trivial right ?
But there's a small catch!

```typescript
const num = 1;

function savePositive(num: number) {
  //save to DB...
}

function isPositive(input: number) {
  return input > 0;
}

if (isPositive(num)) {
  savePositive(num);
}

//this works on the type level!
savePositive(-1);
```

Now could we ever fix this on the type level ?
Enter branded types...

A special kind of type that's defined by us

```typescript
const num = 1;

type PositiveNumber = number & { __positive: true };

function savePositive(num: PositiveNumber) {
  //save to DB...
}

//type guard!
function isPositive(input: number): input is PositiveNumber {
  return input > 0;
}

if (isPositive(num)) {
  savePositive(num);
}

//this doesn't work now...
savePositive(-1);
```

Verdict ? Type safety and enforced business logic on the TYPE LEVEL 🤯 if that doesn't amaze you I dunno what is!
