---
sidebar_position: 2
---

# Satisfies Operator

Introduced in TS 4.9 is a type annotation operator that allows you to add type annotations to values without using type inference.

## Motivation

Why do we need it ?

```typescript
type PersonName = 'John' | 'Jack' | 'Justin';

type OtherDetails = {
  id: number;
  age: number;
};

//the problem starts with unions..
type PersonInfo = PersonName | OtherDetails;

type Person = {
  myInfo: PersonInfo;
  myOtherInfo: PersonInfo;
};

const applicant: Person = {
  myInfo: 'John',
  myOtherInfo: { id: 123, age: 22 },
};

//Error: Property 'toUpperCase' does not exist on type 'PersonInfo'. Property 'toUpperCase' does not exist on type 'OtherDetails'. Manual validation is needed 😢...
applicant.myInfo.toUpperCase();
```

Solution ?

```typescript
// ...missing common parts

const applicantWithSatisfies = {
  myInfo: 'John',
  myOtherInfo: { id: 123, age: 22 },
} satisfies Person;

//can deeply infer now that myInfo is a string
applicantWithSatisfies.myInfo.toUpperCase();
```

Works like a charm now! 🪄

## Actual Use Cases

1. Given a url params type use the satisfies operator as the way to enforce the type contract to a variable assignment by filling the gaps resulting to a Strongly Typed URL.

```typescript
type UrlParams = {
  id: string;
  name: string;
};

//errors out with Property 'name' is missing in type '{ id: string; }' but required in type 'UrlParams'
const params = new URLSearchParams({
  id: '123',
} satisfies UrlParams);
```

2. The very same logic can be applied to objects, arrays and even tuples so let's apply to a variable that satisfies the following tuple type.

```typescript
type AtLeastOneNumber = [number, ...number[]];

const array = [1, 2, 3];

//without satisfies it will not give an error
const maybeExists = array[3];

const tupple = [1, 2, 3] satisfies AtLeastOneNumber;

//errors out with Tuple type '[number, number, number]' of length '3' has no element at index '3'
const definitelyExists = tupple[3];
```