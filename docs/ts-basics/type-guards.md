---
sidebar_position: 3
---

# Type Guards 💂

In TypeScript, type guards are a way to narrow down the type of a variable or value within a certain code block. They are particularly useful when working with union types or when dealing with types that have common properties.

Let's start off by defining some types:

```typescript
type CheckboxProps = {
  type: 'checkbox';
  options: string[];
};

type TextProps = {
  type: 'text';
};

type RadioProps = {
  type: 'radio';
};

//all of them can constitute a more broad type
type InputProps = CheckboxProps | TextProps | RadioProps;
```

Type guards allow you to make more specific type assertions based on runtime checks.

```typescript
function isTextProps(props: InputProps): props is TextProps {
  return props.type === 'text';
}

function isCheckboxProps(props: InputProps): props is CheckboxProps {
  return props.type === 'checkbox' && Array.isArray(props.options);
}

function isRadioProps(props: InputProps): props is RadioProps {
  return props.type === 'radio';
}

isCheckboxProps({ type: 'checkbox', options: [] });
```

# Discriminated Union

In TypeScript, a discriminated union (also known as a tagged union or algebraic data type) is a type that combines multiple other types using a common property, known as a discriminant property. This discriminant property is used to determine which specific type within the union is currently in use. Discriminated unions are commonly used in React applications when dealing with components that can have different states or variations.

```typescript
import React from 'react';

// Define a discriminated union for different message types
type Message =
  | {
      type: 'error';
      content: string;
    }
  | {
      type: 'success';
      content: string;
    }
  | {
      type: 'info';
      content: string;
    };

// Component that renders different messages based on the type
const MessageComponent: React.FC<Message> = ({ type, content }) => {
  switch (type) {
    case 'error':
      return <div className='error'>{content}</div>;
    case 'success':
      return <div className='success'>{content}</div>;
    case 'info':
      return <div className='info'>{content}</div>;
    default:
      return null;
  }
};

// Example usage
const App: React.FC = () => {
  return (
    <div>
      <MessageComponent type='error' content='An error occurred!' />
      <MessageComponent type='success' content='Operation successful!' />
      <MessageComponent type='info' content='Information message.' />
    </div>
  );
};

export default App;
```

This can be extended further on! 🤯 for more customisation if we want to have some descriminants have more or different attributes but this would require that we have to use type-guards to narrow down props into our specific case 🤔...
