// Types can be recursive: they can refer to themselves.

type Nested = number | Nested[];
const n: Nested = [[[[1]], 2, [3]]];