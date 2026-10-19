//Function + Union + Casting
function add (a: number, b: number, ...rest: number[]): number {
  return a + b + rest.reduce((acc, curr) => acc + curr, 0);
}

const number1 = 10;
const number2 = "20";
const number3: number[] = [30];

const sum = add(number1, Number(number2), ...number3);
console.log(`The sum is: ${sum}`); // Output: The sum is: 60

type isThisStringOrNumber = (value: string | number) => string | number;
const checkType: isThisStringOrNumber = (value) => {
  if (typeof value === "string") { return `The value is a string: ${value}`; }
  return `The value is a number: ${value}`;
};
console.log(checkType("Hello")); // Output: The value is a string: Hello
console.log(checkType(42)); // Output: The value is a number: 42
console.log(checkType(42 as unknown as string)); // Output: The value is a number: 42. Reason: TS cho phép ép kiểu nhưng runtime vẫn là number, nên typeof vẫn là number.
