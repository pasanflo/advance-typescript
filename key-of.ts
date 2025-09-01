type User2 = {
  email: string
  age: number
};

type UserAggregate = {
  [K in keyof User2]: Array<User2[K]>
};

const userAggregate: UserAggregate = {
  email: ['amir@example.com'],
  age: [36],
};
userAggregate;