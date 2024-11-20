---
sidebar_position: 2
---

# Indexed Access Types

Indexed Access Types provide a way to access the properties of an object using an index signature. In TypeScript, an index signature is a way to define the shape of an object with keys that are not known at compile time.

```typescript
//object that we want to access the properties of
ObjectType = ...

//key that we want to use to access the property
type ObjectKeyType = keyof ObjectType;

//type of property that we want to access
type PropertyType =
ObjectType[ObjectKeyType];
```

So what do we get from this ? The **explicit** format which we use to define a union type is of major importance.

## Sample Usage

```typescript
type Book = {
  title: string;
  author: string;
  year: number;
};

//PropertyType in this case is of string type
type PropertyType = Book['title'];

const book: Book = {
  title: "The Hitchhiker's Guide to the Galaxy",
  author: 'Douglas Adams',
  year: 1979,
};

//you can verify using object bracket notation that type
const title: PropertyType = book['title'];
```

## Useful Code Use Case

Did you know you could have inference based on the members of an array ?

Let's say we got some array with permission values

```typescript
//notice as const is used to enforce the readonly aspect of the array
export const PERMISSIONS = [
  'view-document',
  'edit-document',
  'delete-document',
] as const;

//we can generate the type out of the value here! 🚀
//infers as "view-document" | "edit-document" | ...
export type Permission = (typeof PERMISSIONS)[number];

//Bonus Tip 🚀 - Extract into a utility type
export type ValueFrom<T> = T[keyof T];

//usage
export type Permission = ValueFrom<typeof PERMISSIONS>;
```

This is a very powerful feature of TS because no matter how big is the whole structure of **PERMISSIONS** you don't need `ENUMS` importing them everywhere and polutting your codebase, just use the literals and be done with it!

Mind bogling right 🤯 ?
