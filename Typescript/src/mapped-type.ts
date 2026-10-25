interface Person {
  name: string;
  age: number;
  address: string;
}

type PartialPersion = {
    [K in keyof Person]?: Person[K];
};

const partialPerson: PartialPersion = {
    name: "Alice",
    // age and address are optional
};

type ReadonlyPerson = {
    readonly [K in keyof Person]: Person[K];
};

const readonlyPerson: ReadonlyPerson = {
    name: "Bob",
    age: 30,
    address: "123 Main St"
};

//@ts-expect-error: 
readonlyPerson.name = "Charlie"; // Error: Cannot assign to 'name' because it is a read-only property.

//Có một số builtin mapped types trong TypeScript như Partial, Readonly, Record, Pick, Omit. Bữa đã có test trong file utility.ts

interface ApiResponse {
    data: unknown;
    error?: string;
    status: number;
}

type FormattedApiResponse = {
    [K in keyof ApiResponse]: K extends 'data' ? string : ApiResponse[K];
};

const response: FormattedApiResponse = {
    data: JSON.stringify({ message: "Success" }), //data is now a string
    status: 200
    // error is optional
};


