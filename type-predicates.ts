// Example 1

type Address = {postalCode: string, country: string};
type User = {name: string, address: Address | undefined};

function isAddress(address: Address | undefined): address is Address {
  return address !== undefined;
}

const amir: User = {
  name: 'Amir',
  address: {postalCode: '75010', country: 'France'}
};

let address: Address;
/* Calling `isAddress` narrows the type of `amir.address` because it's a
 * type predicate. */
if (isAddress(amir.address)) {
  address = amir.address;
} else {
  address = {postalCode: 'unknown', country: 'unknown'};
}
address.postalCode; // Output: { postalCode: '75010', country: 'France' }

// Example 2

type Album = {name: string, copiesSold: number};
type Artist = {name: string, topSellingAlbum: Album | undefined};

function isAlbum(maybeAlbum: Album | undefined): maybeAlbum is Album {
  return maybeAlbum !== undefined;
}

const artist: Artist = {
  name: 'Pink Floyd',
  topSellingAlbum: {
    name: 'The Dark Side of the Moon',
    copiesSold: 24400000,
  },
};

let album: Album;
if (isAlbum(artist.topSellingAlbum)) {
  album = artist.topSellingAlbum;
} else {
  album = {name: 'unknown', copiesSold: 0};
}

album; // Output: { name: 'The Dark Side of the Moon', copiesSold: 24400000 }

// Example 3: Type predicate tips
/*
	If we make a mistake and implement our type predicate function incorrectly, TypeScript won't know. 
	It will blindly trust our predicate, which can lead to incorrect types.
*/

function isNumber(
  num: number | string
): num is number {
  return typeof n === 'string';
}
const num: string = 'oh no';
/* This is a bug! Our `isNumber` function is
 * wrong, so it lets us put a string in a
 * number variable. */
const n2: number = isNumber(num) ? num : 0;
n2; // Output: "oh no" (Just works, even if it's not what we intend)

/* Type predicate arguments are a great place to use unknown. 
Then they can work with any argument. */
function isString(
  s: unknown
): s is string {
  return typeof s === 'string';
}
const s: unknown = {isCat: true};
const s2: string = isString(s)
  ? s
  : 'not a string';
s2; // Output: 'not a string'