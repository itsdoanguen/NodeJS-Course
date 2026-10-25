//soooo assert is pretty funny
function validateStringWithNoAssert(input: unknown): void {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
}

function validateStringWithAssert(input: unknown): asserts input is string {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
}

function processString(input: unknown): void {
    validateStringWithNoAssert(input);
    // TypeScript does not know that input is a string here, so it will give an error if you try to use string methods.
    // @ts-expect-error: Property 'toUpperCase' does not exist on type 'unknown'.
    console.log(input.toUpperCase()); 

    validateStringWithAssert(input);
    // TypeScript knows that input is a string here, so you can safely use string methods.
    console.log(input.toUpperCase());
}

//tóm lại là nếu biến đó qua hàm assert mà không văng thì TypeScript sẽ hiểu là biến đó đúng kiểu mà hàm assert đã định nghĩa. Còn nếu không qua hàm assert thì TypeScript sẽ không hiểu và báo lỗi khi dùng các phương thức của kiểu đó.