// Generic type parameters can have default types. 
// If we use the generic type without specifying its type parameter, we'll get the default.

type OurArray<T=string> = Array<T>;

// This is an Array<string>.
const numbers: OurArray = ['Amir', 'Betty'];
