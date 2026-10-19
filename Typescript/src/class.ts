class CustomVariable<T> {
    private value: T | undefined;

    constructor(initialValue?: T) {
        this.value = initialValue;
    }

    getValue(): T | undefined {
        return this.value;
    }

    setValue(newValue: T): void {
        this.value = newValue;
    }
}

const myVariable = new CustomVariable<number>(42);
console.log(myVariable.getValue()); // Output: 42

myVariable.setValue(100);
console.log(myVariable.getValue()); // Output: 100

function makeAString<T, S>(value1: T, value2: S): string {
    return (value1 as unknown as string) + (value2 as unknown as string);
}

const myString = makeAString<number, string>(42, " is the answer.");
console.log(myString); // Output: "42 is the answer."

function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}

const pair = createLoggedPair("Hello", 42);
// @ts-expect-error: argument of type '{ key: string; }' is not assignable to parameter of type 'string | number'.
const enrorPair = createLoggedPair("Hello", { key: "value" }); 