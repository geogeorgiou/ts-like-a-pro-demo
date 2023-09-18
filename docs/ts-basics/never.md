---
sidebar_position: 4
---

# Never

Very useful type in TS because it lets you express something that shouldn't be possible and usually they are bundled along with generics. It's like wanting to express a positive number and zero should not be part of that type set.

Now let's do that in TS shall we ?

```typescript
//Never cannot be assigned to anything which is never by itself (negating type)

const str: never = 'hello';

const str: never = {};
const str: never = false;

//generic constraint
type NoEmptyString<T extends string> = T extends '' ? never : T;

const prefixWithHello = <T extends string>(a: NoEmptyString<T>) => {
  return `hello ${a}`;
};

//fails on empty string!
prefixWithHello('');
```

The beautiful thing with this is that we get safety on the type level and that can be great because we don't have to repeat assertions that perhaps we've already made.
