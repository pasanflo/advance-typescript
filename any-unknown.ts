type ItemsObject<A extends Array<any>> = {
  items: A
};

function getFirstNumber<T extends Array<any>>(
  itemsObject: ItemsObject<T>
): number {
  const firstElement: number = itemsObject.items[0];
  return firstElement;
}

getFirstNumber({items: ['a', 'b', 'c']});