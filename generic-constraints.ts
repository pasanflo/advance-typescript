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

// Example 2:
// Suppose that we want a generic object type containing an items array. We want to ensure that items is actually an array, 
// so we use a generic constraint. Our first attempt is <A extends Array>. 
// Unfortunately, that's a type error: Array requires a generic type argument, but we didn't give it one.

type ItemsObject<A extends Array> = {
  items: A
};

const itemsObject: ItemsObject<Array<number>> = {items: [1, 2, 3]};
itemsObject; // type error: Generic type 'Array<T>' requires 1 type argument(s).

type ItemsObject<A extends Array<any>> = {
  items: A
};

const itemsObject: ItemsObject<Array<number>> = {
  items: [1, 2, 3]
};
itemsObject; // Output: { items: [1, 2, 3] }

// Our code correctly type errors when items isn't an array.

type ItemsObject<A extends Array<any>> = {
  items: A
};

const stringObject: ItemsObject<string> = {
  items: 'Important Data'
};
stringObject; // type error: Type 'string' does not satisfy the constraint 'any[]'.

type ItemsObject<A extends Array<any>> = {
  items: A
};

function getItemCount<A extends Array<any>>(
  itemsObject: ItemsObject<A>
): number {
  return itemsObject.items.length;
}
getItemCount({items: ['a', 'b', 'c']}); // 3
// That code compiles, but now the any has become very dangerous!
// When checking the function's types, itemsObject.items is an Array<any>,
// so all of its elements have the any type




// In the next example, note that getFirstNumber's type says that it returns a number. But at runtime, we get a string instead.



type ItemsObject<A extends Array<any>> = {
  items: A
};

function getFirstNumber<T extends Array<any>>(
  itemsObject: ItemsObject<T>
): number {
  const firstElement: number = itemsObject.items[0];
  return firstElement;
}

getFirstNumber({items: ['a', 'b', 'c']}); // 'a' (This is because of "any" type)


// There are a couple of ways to remove that dangerous any. First, we can use unknown instead. With that change, our buggy getFirstNumber function causes a type error.

type ItemsObject<A extends Array<unknown>> = {
  items: A
};

function getFirstNumber<T extends Array<unknown>>(
  itemsObject: ItemsObject<T>
): number {
  const firstElement: number = itemsObject.items[0];
  return firstElement;
}

getFirstNumber({items: ['a', 'b', 'c']}); // type error: Type 'unknown' is not assignable to type 'number'.



// We prevented the bug, but now for the bigger question: how do we write a getFirstElement function that works,
// and has the correct return type, no matter what type is in the array? 
// One solution is to take the T in Array<T> as our type parameter.


type ItemsObject2<T> = {
  items: Array<T>
};

function getFirstElement<T>(
  itemsObject: ItemsObject2<T>
): T {
  const firstElement: T = itemsObject.items[0];
  return firstElement;
}

getFirstElement({items: ['d', 'e', 'f']}); // 'd'