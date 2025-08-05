// This is a utility type that converts a string to kebab-case.
// It is used to convert the names of the core tokens to kebab-case.
export type Kebab<T extends string> = T extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<F>}${Kebab<R>}`
    : `${Lowercase<F>}-${Kebab<Uncapitalize<R>>}`
  : T;

// This is a utility type that enforces required properties on a type.
// It is used to ensure that certain properties are required in a type.
export type EnforceRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

// This is a utility type that enforces optional properties on a type.
// It is used to ensure that certain properties are optional in a type.
export type EnforceOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
