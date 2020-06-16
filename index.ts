const foo = import("./foo.json");
const bar = import("./bar.json");

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type PromiseType<P> = P extends Promise<infer T> ? T : never;

type Foo = PromiseType<typeof foo>;
type Bar = PromiseType<typeof bar>;

type UnionedJsonModules = Foo | Bar;

// Unions of types inferred from JSON modules being converted to
// intersections worked in 3.8.3 but resolves to never in 3.9.5
export type X = UnionToIntersection<UnionedJsonModules>;
