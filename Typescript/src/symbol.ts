const my_id: unique symbol = Symbol("my_id");

interface User {
    name: string;
    age: number;
    [my_id]?: string;
    id?: string;
}

const user: User = {
    name: "John",
    age: 30
};

user[my_id] = "unique_id_123";
user.id = "user_001";

console.log(user[my_id]); // Output: unique_id_123
console.log(user.id); // Output: user_001

/*
Explanation:
As you can see, we have defined a unique symbol `my_id` and used it as an optional property in the `User` interface. This allows us to add a unique identifier to the user object without conflicting with other properties. The `id` property is also added as a regular string property.

Typescript's symbols are unique and it work like an UUID, which means that even if two symbols have the same description, they are still considered different. This is useful for creating unique keys in objects, especially when you want to avoid property name collisions.

Let look at another example below:
*/

const WAREHOUSE_ID: unique symbol = Symbol("ID");
const PRODUCT_ID: unique symbol = Symbol("ID");

interface Product {
    name: string;
    [WAREHOUSE_ID]?: string;
    [PRODUCT_ID]?: string;
}

const product: Product = {
    name: "Laptop"
};

product[WAREHOUSE_ID] = "warehouse_001";
product[PRODUCT_ID] = "product_001";

console.log(product[WAREHOUSE_ID]); // Output: warehouse_001
console.log(product[PRODUCT_ID]); // Output: product_001    
console.log(product[WAREHOUSE_ID] === product[PRODUCT_ID]); // Output: false

/*
In this example, we have defined two unique symbols `WAREHOUSE_ID` and `PRODUCT_ID`, both with the same description "ID". However, they are treated as different symbols, allowing us to use them as unique keys in the `Product` interface. This prevents any potential conflicts between the two properties, even though they share the same description.
*/