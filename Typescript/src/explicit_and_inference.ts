let explicitString: string = "TypeScript";
let explicitNumber: number = 2026;
let explicitArray: number[] = [10, 20, 30];

let inferredString = "TypeScript";
let inferredNumber = 2026;
let inferredArray = [10, 20, 30];

function calculateTax(price: number, rate: number): number {
  return price * rate;
}

const product = {
  id: 101,
  name: "Laptop",
  inStock: true
};

/*
This snippet demonstrates the difference between explicitly declaring types and letting TypeScript infer them automatically. Inferred types provide concise syntax for simple declarations with immediate value assignments, whereas explicit typing on function parameters, return values, and structured objects ensures API contracts remain predictable and self-documenting.
*/

let accountHolder: string = "Alice";
// @ts-expect-error Type 'number' is not assignable to type 'string'.
accountHolder = 1002;

let balance = 5000;
// @ts-expect-error Type 'string' is not assignable to type 'number'.
balance = "Five Thousand";

/*
TypeScript guarantees compile-time type safety for both explicitly typed and inferred variables. Once a variable is initialized, its type is locked, causing the compiler to flag an error immediately when a value of an incompatible type is reassigned.
*/

let placeholder;
placeholder = "Initial string";
placeholder = 42;
placeholder = false;

const rawPayload = JSON.parse('{"status": "ok", "code": 200}');
rawPayload.triggerNonExistentHandler();

/*
Inference fallback to any.

In this example, the variable `placeholder` is declared without an initial value, allowing it to accept any type. However, once a specific type is assigned, TypeScript will enforce that type for subsequent assignments. The `rawPayload` variable is inferred as `any` due to the use of `JSON.parse`, which can lead to runtime errors if properties are accessed that do not exist on the parsed object. This highlights the importance of using explicit types or type assertions when working with dynamic data.
*/

let dynamicPayload: any = {
  id: 101,
  metadata: { version: "1.0.0" }
};

dynamicPayload = "Server payload corrupted";

dynamicPayload.calculateChecksum();

const extractedField = dynamicPayload.nonExistentProperty;
const secondaryReference = extractedField.nestedValue;

/* 
The any type allows for maximum flexibility but sacrifices type safety. In this example, `dynamicPayload` is initially an object but is later reassigned to a string, which can lead to runtime errors when attempting to call methods or access properties that do not exist on the new type. This demonstrates the risks associated with using `any` and emphasizes the importance of maintaining type integrity in TypeScript applications.

An any variable also can lead to a chain of any type, where subsequent operations on the variable are also treated as any, further increasing the potential for runtime errors. This is why it's generally recommended to avoid using `any` unless absolutely necessary and to prefer explicit typing or type assertions to maintain type safety.

For example: 
*/

function getResponse(): any {
  return { id: 1, title: "Test" };
}

const res = getResponse(); // res is any
const title = res.title;   // title is also any, losing all type checking