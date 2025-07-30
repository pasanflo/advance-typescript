// Constraints force a generic type parameter to extend some other type. 
// This lets us introduce limitations like "this function is generic, but the parameter must be an object with an age parameter".

/* `filterByAge` works with arrays of any
 * object type, as long as it has an
 * `age: number` property. */
function filterByAge<T extends {age: number}>(
  things: Array<T>,
  max: number
): Array<T> {
  return things.filter(
    thing => thing.age < max
  );
}