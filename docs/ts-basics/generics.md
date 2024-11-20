---
sidebar_position: 4
---

# Generics

They allow you to create flexible and reusable components, functions, or classes that can work with different data types while maintaining type safety. They enable you to parameterize types, making your code more versatile and adaptable. Generics are particularly useful when you want to write functions or classes that work with various data structures without sacrificing type checking.

Let's see an error prone example:

```typescript
//sample API contract
type ApiResponse = {
  status: number;
  data: any;
};

//anything is applicable for data
const response1: ApiResponse = {
  status: 200,
  data: 'str',
};
```

But this isn't !

```typescript
//sample re-usable API contract
type ApiResponseCustom<T> = {
  status: number;
  data: T;
};

//define your own custom type!
type DataType = {
  id: number;
  name: string;
};

//Property 'name' is missing in type '{ id: number; }' but required in type 'DataType'.
const response2: ApiResponseCustom<DataType> = {
  status: 200,
  data: {
    id: 123,
  },
};
```

If you start using them common contracts like shown on the example will be easily identifiable and searchable throughout a project which is a nice advantage to have.

However they do increase complexity and one must be familiar with the syntax and their use cases.