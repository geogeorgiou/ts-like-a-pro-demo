// — What is as const in Typescript and what’s the difference with a normal const in TS ?
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html
// As const relatively new feature that allows objects are sealed in the way that we cannot manipulate the object
const config = {
  name: 'name',
  lastName: 'lastName',
};
config.name = 'whatever'; //Applicable!
const config2 = {
  name: 'name',
  lastName: 'lastName',
} as const;
// config2.name = 'whatever' //NO LONGER Applicable!
const config3 = {
  name: 'name',
  lastName: 'lastName',
  themePreferences: {
    mode: 'dark',
  },
} as const;
// config3.themePreferences.mode = 'light'; //NO LONGER Applicable compared as well on nested objects!
// With regular JS we can use Object.freeze to freeze object without modifying it but the main DIFF is
// As const runs on BUILD TIME
// Object.freeze runs on RUNTIME (and only on first level deep)
// ------------------------------------
// satisfies operator markdown...
// explain satisfies with this https://www.youtube.com/watch?v=r1L35zxZQPE
// difference between satifies and as const (with example)
// satifies operates on the value while as const on the type
// Indexed access markdown...
// remind people about literal types with Chess example
// use case within code with conversion of role values into a literal type for UserRole in application
export const PERMISSIONS = [
  'view-document',
  'edit-document',
  'delete-document',
] as const;
type ValueFrom<T> = T[keyof T];
type Permission = ValueFrom<typeof PERMISSIONS>;
// — What is a generic function in TS and can you write one ?
// Generic function it’s a way to write type flexible code without using any (we don’t know the type beforehand only when we’re using that function)
function myNewFunc<T>(arg: T) {
  return 'string' as T;
}
myNewFunc<number>('string'); //will error out
//now let's do the md exercise
// generics revisited what is a generic function sample with API response
// generics retrofited with index access sample

// import { ComponentProps } from 'react'

// type ButtonProps = ComponentProps<'button'>

// const Button = ({ children, ...rest }: ButtonProps) => {
//   return <button {...rest}>{children}</button>;
// };

// export default Button;
