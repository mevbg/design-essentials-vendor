// This is a utility type that converts a string to kebab-case.
// It is used to convert the names of the core tokens to kebab-case.
export type Kebab<T extends string> = T extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<F>}${Kebab<R>}`
    : `${Lowercase<F>}-${Kebab<Uncapitalize<R>>}`
  : T;
