---
sidebar_position: 5
---

# Infer

Infer is introduced in TS 2.8 and we use that when we want to create a type within a conditional type and that's it's sole purpose!

Inception right ? 😅

## Motivation

Why do we need it ?

Because it's very useful for pattern matching but before elaborate on that we'll briefly iterate on some code...

```typescript
type Result = boolean extends true ? 1 : 0;

const func = (check: true) => {};

const a: boolean = false;

func(a); //Argument of type 'false' is not assignable to parameter of type 'true'
```

Let's extend the previous a little bit

```typescript
const func = (check: boolean) => {
  return 123456789;
};

type FuncResponse = ReturnType<typeof func>; //number
```

Let's dive deep 🤿 into TS `ReturnType` own definition, understand a little bit of it's structure and move on from there

```typescript
//uses conditional check!
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

Let's make our own result type describing a function that returns anything to match 1 otherwise 0

```typescript
type MyResult = typeof func extends (...args: any) => any ? 1 : 0;

//but what if we wanted to extract the response from that very function ?
type MyResult2 = typeof func extends (...args: any) => infer R ? R : 0;
```

Now you could think of `R` as a tmp variable (you can always rename it however you like) that you could do some manipulation on it.

Ok cool but if we pattern match the wrong thing and we want to forbid that behaviour ? You already know - we use `never`!

```typescript
type MyResult2 = typeof func extends (...args: any) => infer R ? R : never;
```

## Examples

Let's check it out in action! 🏃

### Functions

Static type with infer

```typescript
const random = [1, 2, 3];

type MyResult3 = typeof random extends (...args: any) => infer R ? R : never; //never
```

Generic type with infer

```typescript
const anotherRandom = {};

type MyResult4<T> = T extends (...args: any) => infer R ? R : never;
type AnotherRandomResult = MyResult4<typeof anotherRandom>; //never

const foo = () => true;

type MyResult5<T> = T extends (...args: any) => infer R ? R : never;
type FooResult = MyResult5<typeof foo>; //boolean
```

You could always expand besides `R` and add your own types as well and that's valid as well like so:

```typescript
type MyResult6<T> = T extends (...args: any) => infer R
  ? R | string | {}
  : never;
type FooResult = MyResult6<typeof foo>; //boolean | string | {}
```

### Objects

Now let's check what happens with objects

```typescript
type RetrieveNestedProperty<T> = T extends {
  a: {
    b: {
      c: infer C;
    };
  };
}
  ? C
  : never;

type C = RetrieveNestedProperty<{
  a: {
    b: {
      c: number;
    };
  };
}>; //number
```

It can get even more complicated than that with

```typescript
type RetrieveNestedProperty2<T> = T extends
  | {
      a: {
        b: {
          c: infer C;
        };
      };
    }
  | {
      a: {
        c: infer C;
      };
    }
  | {
      c: infer C;
    }
  ? C
  : never;

type C = RetrieveNestedProperty2<{
  c: string;
}>; //string
```
