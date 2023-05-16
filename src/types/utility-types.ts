type AnyObject = Record<PropertyKey, any>;

export type Prettify<T extends AnyObject> = {
  [K in keyof T]: T[K];
};

export type PartialByKeys<T extends AnyObject, K extends keyof T> = Omit<
  T,
  K
> & {
  [Key in K]?: never;
};
