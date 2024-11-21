---
sidebar_position: 4
---

# Type Predicate Inference

## Pre TS 5.5

If we simply wanted to narrow down a type of a variable we could do something like this

```typescript
const text: string | number = ...

//we wan't to narrow down as a string only
if (typeof text === "string" )
  console.log(text) //string!
```

But what happens if we wanted to make a function out of this ?

```typescript
function isString(value: unknown) {
  return typeof value === 'string';
}

//then use it as
if (isString(text)) {
  console.log(text); //text is "string" | "number" ...
}
```

That's not very helpful is it ? 🤔 We completely lost our narrowing functionality now!
To battle this earlier on TS introduced return type annotations like we've seen so far:

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

//then use it as
if (isString(text)) {
  console.log(text); //text is "string" again now!
}
```

But this is not only is more boilerplate for us to write but it's also **error prone**! Think
what happens if `value is string` is changed to `value is number` by mistake...

You guessed it TS is going to infer that as number! 😡

## After TS 5.5

This whole mess has been resolved with TS 5.5 and now we can write the code in a more streamlined
way like so:

```typescript
function isString(value: unknown) {
  return typeof value === 'string';
}

//then use it as
if (isString(text)) {
  console.log(text); //text is "string" !
}
```

In addition this can work as well with in-line functions like filter

```typescript
const onlyTextArray = ['a', 'b', 'c', null].filter((member) => {
  return typeof member === 'string';
});

//EQUAL TO
const onlyTextArray = ['a', 'b', 'c', null].filter((member) => {
  return member !== null;
});

//IMPORTANT! 💣 - DOESN'T WORK
const onlyTextArray = ['a', 'b', 'c', null].filter((member) => {
  return !!member;
});

//IMPORTANT! 💥 - DOESN'T WORK
const onlyTextArray = ['a', 'b', 'c', null].filter(Boolean);
```

So truthiness assertion and the Boolean hack don't really qualify as being an automatically infered type predicates...

## Bonus 🎁

What if I wanted to do that with an object ? there we should have used the good'ol type guard!

```typescript
type Person = {
  id: string;
  name: string;
};

const onlyPersonArray = ['a', 'b', 'c', 1, { id: '1', name: 'Peter' }, null];

// Type guard function to check if an element is of type Person
const isPerson = (item: unknown): item is Person => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'name' in item &&
    item.id === 'string' &&
    item.name === 'string'
  );
};

const onlyPersons = onlyPersonArray.filter(isPerson); //Person[]
```

This is a pretty welcome feature for us devs and massively improves the codebase!
So stick to Typescript narrowing and you'll be able to make the most out of this! 🚀
