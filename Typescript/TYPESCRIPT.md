# TỔNG HỢP KIẾN THỨC TYPESCRIPT

Tài liệu ghi chép và hệ thống hóa các kiến thức trọng tâm trong TypeScript, được tổng hợp từ quá trình học và thực hành qua bộ bài tập W3Schools và các ví dụ mã nguồn.

---

## 1. Khai báo tường minh (Explicit Types) và Suy luận kiểu (Type Inference)

### Khái niệm
- Explicit Typing (Khai báo tường minh): Chỉ định rõ ràng kiểu dữ liệu cho biến, tham số hàm hoặc giá trị trả về.
- Type Inference (Suy luận kiểu): TypeScript tự động xác định kiểu dữ liệu dựa trên giá trị khởi tạo ban đầu.

### So sánh và nguyên tắc áp dụng
- Type Inference phù hợp cho các khai báo biến đơn giản khi có gán giá trị ngay lập tức, giúp cú pháp ngắn gọn và giảm trùng lặp mã.
- Explicit Typing đặc biệt quan trọng với tham số hàm, kiểu trả về và các cấu trúc dữ liệu phức tạp (Object, Interface), giúp định hình rõ ràng API contract, tăng tính dễ đoán và tự tài liệu hóa mã nguồn (self-documenting).

```typescript
// Khai báo tường minh
let explicitString: string = "TypeScript";
let explicitNumber: number = 2026;
let explicitArray: number[] = [10, 20, 30];

// Suy luận kiểu tự động
let inferredString = "TypeScript"; // string
let inferredNumber = 2026;         // number
let inferredArray = [10, 20, 30];  // number[]

// Khai báo tường minh cho hàm
function calculateTax(price: number, rate: number): number {
  return price * rate;
}
```

### An toàn kiểu tại thời điểm biên dịch (Compile-time Type Safety)
TypeScript đảm bảo an toàn kiểu ở giai đoạn compile cho cả biến tường minh và suy luận. Khi biến đã được khởi tạo, kiểu của nó bị khóa cố định (locked). Compiler sẽ lập tức báo lỗi nếu có hành vi gán giá trị thuộc kiểu không tương thích.

```typescript
let balance = 5000;
// Lỗi biên dịch: Type 'string' is not assignable to type 'number'
balance = "Five Thousand";
```

### Fallback về any và rủi ro của kiểu any
- Biến khai báo mà không có giá trị khởi tạo ban đầu (`let placeholder;`) sẽ rơi vào trạng thái suy luận kiểu `any`.
- Các hàm phân tích dữ liệu động như `JSON.parse` mặc định trả về `any`, tiềm ẩn rủi ro lỗi runtime khi truy cập thuộc tính không tồn tại.
- Hiện tượng lây lan kiểu any (Chain of any): Bất kỳ biến hoặc thuộc tính nào được trích xuất từ một biến mang kiểu `any` đều trở thành `any`, làm mất hoàn toàn khả năng kiểm tra kiểu của TypeScript trong toàn bộ chuỗi xử lý tiếp theo.
- Khuyến nghị: Hạn chế tối đa việc sử dụng `any`, thay vào đó nên sử dụng khai báo kiểu tường minh, `unknown` hoặc type assertions an toàn.

```typescript
function getResponse(): any {
  return { id: 1, title: "Test" };
}

const res = getResponse(); // res có kiểu any
const title = res.title;   // title cũng trở thành any, mất toàn bộ kiểm tra kiểu
```

---

## 2. Mảng (Array) và Đối tượng (Object) cơ bản

- Mảng trong TypeScript được định kiểu theo dạng `T[]` hoặc cú pháp Generic `Array<T>`.
- Bộ dữ liệu Tuple cho phép định nghĩa một mảng có số lượng phần tử cố định và kiểu dữ liệu xác định tại từng vị trí chỉ mục: `[string, number]`.
- Cấu trúc đối tượng (Object Shape) có thể được khai báo trực tiếp hoặc thông qua Type Alias / Interface, với hỗ trợ các thuộc tính tùy chọn thông qua dấu chấm hỏi `?`.

```typescript
const numbers: number[] = [1, 2, 3];
const coordinates: [number, number] = [10.5, 20.8];

const product: { id: number; name: string; inStock?: boolean } = {
  id: 101,
  name: "Laptop"
};
```

---

## 3. Kiểu hàm (Function), Tham số Rest và Ép kiểu (Type Casting)

### Khai báo hàm và Tham số Rest
Hàm có thể định nghĩa kiểu cụ thể cho từng tham số, tham số phần dư (Rest Parameters với cú pháp `...rest: T[]`) và kiểu trả về.

```typescript
function add(a: number, b: number, ...rest: number[]): number {
  return a + b + rest.reduce((acc, curr) => acc + curr, 0);
}

const sum = add(10, 20, 30, 40); // 100
```

### Type Alias cho chữ ký hàm (Function Signatures)
Có thể tách định nghĩa chữ ký của hàm thành một Type riêng biệt để tái sử dụng.

```typescript
type StringOrNumberChecker = (value: string | number) => string | number;

const checkType: StringOrNumberChecker = (value) => {
  if (typeof value === "string") {
    return `The value is a string: ${value}`;
  }
  return `The value is a number: ${value}`;
};
```

### Bản chất của Type Casting
- Type Casting với từ khóa `as` (ví dụ `value as unknown as string`) chỉ có tác dụng đánh lừa TypeScript compiler tại thời điểm biên dịch (compile-time).
- Tại thời điểm thực thi (runtime), giá trị và kiểu thực tế của biến không hề thay đổi. Do đó, các toán tử kiểm tra runtime như `typeof` vẫn trả về kiểu dữ liệu gốc ban đầu.

```typescript
console.log(checkType(42 as unknown as string));
// Kết quả in ra: "The value is a number: 42"
// Lý do: TS cho phép ép kiểu lúc compile, nhưng runtime giá trị vẫn là 42 (number).
```

---

## 4. Type Alias và Interface

### Định nghĩa và mục đích sử dụng
- Type Alias (`type`): Đặt tên cho một kiểu dữ liệu bất kỳ.
- Interface (`interface`): Dùng để định nghĩa hình dạng của đối tượng (object shape) hoặc chữ ký phương thức.

### Cơ chế Merging và Kế thừa của Interface
- Interface Merging (Declaration Merging): Khi khai báo nhiều interface trùng tên trong cùng một phạm vi, TypeScript sẽ tự động gộp các thuộc tính lại làm một. Type Alias không hỗ trợ tính năng này.
- Kế thừa: Interface hỗ trợ mở rộng bằng từ khóa `extends`.

```typescript
// Interface Merging
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}

const mergedAnimal: Animal = {
  name: "Buddy",
  age: 5
};

// Interface Extension
interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Max",
  age: 3,
  breed: "Border Collie"
};
```

### So sánh điểm khác biệt cốt lõi
- Interface chủ yếu chuyên dùng cho object shapes và function/method signatures.
- Type Alias linh hoạt hơn và biểu diễn được các cấu trúc mà Interface không thể làm được:
  - Primitive types: `type UserId = string;`
  - Union types: `type StringOrNumber = string | number;`
  - Tuple types: `type Coordinates = [x: number, y: number];`
  - Mapped types và Conditional types.

---

## 5. Assertion Functions (`asserts`)

### Khái niệm
Assertion Function là hàm kiểm tra dữ liệu và ném ra ngoại lệ (throw Error) nếu điều kiện không thỏa mãn. Trong TypeScript, hàm này sử dụng chữ ký kiểu `asserts <biến> is <kiểu>` hoặc `asserts <điều_kiện>`.

### So sánh hàm kiểm tra thông thường và Assertion Function
- Hàm kiểm tra thông thường (trả về `void`): Dù có ném ra lỗi nếu điều kiện sai, TypeScript compiler bên ngoài phạm vi hàm vẫn không biết rằng biến đã được kiểm tra, do đó không tự thu hẹp kiểu (biến vẫn giữ nguyên kiểu `unknown`).
- Assertion Function: Báo hiệu rõ ràng cho TypeScript rằng nếu dòng thực thi vượt qua được hàm assert mà không ném ngoại lệ, biến truyền vào chắc chắn đạt đúng kiểu đã chỉ định. Compiler sẽ tự động narrow kiểu của biến ngay sau dòng gọi hàm.

```typescript
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
  // Lỗi biên dịch: Property 'toUpperCase' does not exist on type 'unknown'.
  // input.toUpperCase();

  validateStringWithAssert(input);
  // Hợp lệ: TypeScript đã hiểu input là string
  console.log(input.toUpperCase());
}
```

---

## 6. Class và Generics

### Generic Class
Generic cho phép tạo các lớp có thể làm việc với nhiều kiểu dữ liệu khác nhau mà vẫn duy trì tính an toàn kiểu.

```typescript
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

const myNumberVar = new CustomVariable<number>(42);
```

### Generic Constraints (Ràng buộc tham số kiểu)
Sử dụng từ khóa `extends` trong khai báo Generic để giới hạn kiểu dữ liệu được phép truyền vào.

```typescript
function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}

const pair = createLoggedPair("Hello", 42); // Hợp lệ

// Lỗi biên dịch vì tham số thứ hai không thỏa mãn ràng buộc string | number
// const errorPair = createLoggedPair("Hello", { key: "value" });
```

---

## 7. Literal Types và Template Literal Types

### Literal Types kết hợp Union Types
Literal Types cho phép gán trực tiếp một giá trị cụ thể làm kiểu dữ liệu, thường kết hợp với Union Types (`|`) để tạo tập hợp giá trị hợp lệ cố định.

```typescript
type HttpSuccessResponse = {
  status: 200 | 201 | 202;
  message: 'Success' | 'Created' | 'Accepted';
};

type HttpErrorResponse = {
  status: 400 | 401 | 403 | 404 | 500;
  message: 'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error';
};

type HttpResponse = HttpSuccessResponse | HttpErrorResponse;
```

### Template Literal Types
Cho phép xây dựng các kiểu chuỗi ký tự dựa trên mẫu template string, kết hợp tự động các tập hợp chuỗi lại với nhau.

```typescript
type HttpStatusCode = 200 | 404 | 500;
type HttpStatusMessage = 'Success' | 'Not Found' | 'Error';

type HttpResponseString = `${HttpStatusCode} ${HttpStatusMessage}`;

let res1: HttpResponseString = '200 Success';   // Hợp lệ
// let res2: HttpResponseString = '200 Invalid'; // Lỗi biên dịch
```

### Trích xuất kiểu nâng cao với từ khóa infer trong Template Literal Types
Kết hợp Template Literal Types với Conditional Types và từ khóa `infer` cho phép phân tích và trích xuất các thành phần bên trong chuỗi tại thời điểm biên dịch.

```typescript
type BaseUrl = 'https://api.example.com';
type ApiVersion = 'v1' | 'v2' | 'v3';
type Endpoint = 'users' | 'products' | 'orders';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiUrl = `${BaseUrl}/${ApiVersion}/${Endpoint}`;

type ParsedRequest<T extends ApiUrl> = T extends `${BaseUrl}/${infer V extends ApiVersion}/${infer E extends Endpoint}`
  ? { url: T; method: HttpMethod; version: V; endpoint: E }
  : never;

function createApiRequest<T extends ApiUrl>(url: T, method: HttpMethod): ParsedRequest<T> {
  const parts = url.split('/');
  const endpoint = parts.pop() as Endpoint;
  const version = parts.pop() as ApiVersion;

  return { url, method, version, endpoint } as ParsedRequest<T>;
}

const request = createApiRequest('https://api.example.com/v1/users', 'GET');
console.log(request.version);  // v1
console.log(request.endpoint); // users
```

---

## 8. Symbol và Unique Symbol

### Đặc tính của Symbol
- Mỗi một Symbol được tạo ra thông qua `Symbol()` luôn là một giá trị duy nhất mang tính chất tương tự như UUID.
- Kể cả khi hai Symbol được khởi tạo với cùng chuỗi mô tả (description), chúng vẫn hoàn toàn khác nhau khi so sánh đẳng thức (`===`).

### Unique Symbol làm khóa thuộc tính đối tượng
- Cú pháp `const my_id: unique symbol = Symbol("my_id");` khai báo một symbol danh định độc nhất.
- Sử dụng `unique symbol` làm thuộc tính trong Interface hoặc Object giúp đảm bảo thuộc tính đó không bao giờ bị xung đột tên (Property name collision) với các thuộc tính chuỗi thông thường hoặc giữa các module khác nhau.

```typescript
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

console.log(product[WAREHOUSE_ID] === product[PRODUCT_ID]); // false
```

---

## 9. Type Guards và Thu hẹp kiểu (Type Narrowing)

Type Guard là các biểu thức runtime giúp TypeScript suy luận và thu hẹp phạm vi kiểu dữ liệu trong các khối điều kiện `if-else`.

### Toán tử instanceof
Kiểm tra xem một đối tượng có phải là thể hiện (instance) của một Class cụ thể hay không.

```typescript
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript nhận diện animal là Dog
  } else {
    animal.meow(); // TypeScript nhận diện animal là Cat
  }
}
```

### Toán tử in
Kiểm tra xem một thuộc tính có tồn tại trên đối tượng hay không để phân biệt giữa các cấu trúc đối tượng khác nhau.

```typescript
function makeSoundByProperty(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else if ("meow" in animal) {
    animal.meow();
  }
}
```

---

## 10. Kiểu Unknown và Thu hẹp kiểu an toàn (Safe Type Narrowing)

### So sánh unknown và any
- `any` tắt bỏ toàn bộ hệ thống kiểm tra kiểu, cho phép tự do gọi hàm hoặc truy cập thuộc tính mà không cần kiểm chứng, dễ phát sinh lỗi runtime nghiêm trọng.
- `unknown` là đối trọng an toàn kiểu của `any`. Biến mang kiểu `unknown` có thể nhận bất kỳ giá trị nào, nhưng TypeScript nghiêm cấm việc đọc thuộc tính, thực hiện phép toán hoặc gọi hàm trực tiếp trên biến đó.

### Cơ chế làm việc với unknown
Trước khi thao tác với biến `unknown`, lập trình viên bắt buộc phải kiểm tra và thu hẹp kiểu bằng runtime guards (như `typeof`, `Array.isArray`, toán tử `in`) hoặc thông qua type assertion tường minh.

```typescript
let rawServerData: unknown = '{"statusCode": 200, "statusText": "OK"}';

function normalizePayload(input: unknown): string {
  if (typeof input === "string") {
    return input.trim().toLowerCase();
  }

  if (typeof input === "number") {
    return input.toFixed(2);
  }

  if (input !== null && typeof input === "object" && "statusCode" in input) {
    const status = (input as { statusCode: unknown }).statusCode;
    return String(status);
  }

  return "UNKNOWN_FORMAT";
}
```

---

## 11. Các Utility Types tích hợp

TypeScript cung cấp sẵn tập hợp các Utility Types giúp biến đổi và tái cấu trúc kiểu dữ liệu nhanh chóng.

Cho interface cơ sở:
```typescript
interface Point {
  point_x: number;
  point_y: number;
  point_z?: number;
}
```

### Partial và Required
- `Partial<T>`: Biến tất cả các thuộc tính của `T` thành tùy chọn (`optional`).
- `Required<T>`: Biến tất cả các thuộc tính của `T` thành bắt buộc, bao gồm cả những thuộc tính vốn được đánh dấu `?`.

```typescript
let partialPoint: Partial<Point> = {
  point_x: 20
}; // Hợp lệ, point_y không bắt buộc

let requiredPoint: Required<Point> = {
  point_x: 30,
  point_y: 40,
  point_z: 50 // Bắt buộc phải có point_z
};
```

### Pick và Omit
- `Pick<T, Keys>`: Chọn lọc một tập hợp các thuộc tính cụ thể từ `T`.
- `Omit<T, Keys>`: Loại bỏ các thuộc tính được chỉ định ra khỏi `T`.

```typescript
let omittedPoint: Omit<Point, 'point_y'> = {
  point_x: 50,
  point_z: 60
};

let pickedPoint: Pick<Point, 'point_z'> = {}; // Chỉ chứa point_z (vẫn optional)
```

### ReturnType và Parameters
- `ReturnType<T>`: Trích xuất kiểu trả về của một function type.
- `Parameters<T>`: Trích xuất một tuple chứa kiểu của các tham số nhận vào từ một function type.

```typescript
type PointGenerator = () => Point;
type ExtractedReturn = ReturnType<PointGenerator>; // Point

type PointPrinter = (point: Point) => void;
const pointInput: Parameters<PointPrinter>[0] = {
  point_x: 90,
  point_y: 100
};
```

---

## 12. Mapped Types

### Khái niệm
Mapped Types cho phép xây dựng các kiểu dữ liệu mới bằng cách duyệt qua từng khóa (key) của một kiểu dữ liệu hiện có bằng cú pháp `[K in keyof T]`.

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

// Tự tạo kiểu Partial tùy biến
type PartialPerson = {
  [K in keyof Person]?: Person[K];
};

// Tự tạo kiểu Readonly tùy biến
type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

const readonlyUser: ReadonlyPerson = {
  name: "Bob",
  age: 30,
  address: "123 Main St"
};

// Lỗi biên dịch: Cannot assign to 'name' because it is a read-only property
// readonlyUser.name = "Charlie";
```

### Mapped Types kết hợp Điều kiện (Conditional Mapped Types)
Có thể áp dụng logic điều kiện để thay đổi kiểu của một số thuộc tính cụ thể trong quá trình duyệt qua các khóa.

```typescript
interface ApiResponse {
  data: unknown;
  error?: string;
  status: number;
}

type FormattedApiResponse = {
  [K in keyof ApiResponse]: K extends 'data' ? string : ApiResponse[K];
};

const apiResponse: FormattedApiResponse = {
  data: JSON.stringify({ message: "Success" }), // data đã được ép về string
  status: 200
};
```

---

## 13. Xử lý bất đồng bộ (Asynchronous TypeScript)

### Typed Promise và Song song hóa với Promise.all
- Hàm bất đồng bộ (`async`) luôn trả về một kiểu đại diện `Promise<T>`.
- Khác biệt giữa chạy tuần tự (Sequential) và chạy song song (Parallel) với `Promise.all`: Khi các tác vụ độc lập được chạy song song qua `Promise.all`, tổng thời gian thực thi giảm xuống tương đương với tác vụ dài nhất thay vì tổng thời gian cộng dồn của từng tác vụ.

```typescript
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUser = async (id: string): Promise<{ id: string; name: string }> => {
  await delay(1000);
  return { id, name: "John Doe" };
};

// Xử lý song song tối ưu thời gian
const [user, day, month] = await Promise.all([
  fetchUser('1'),
  fetchDay('1'),
  fetchMonth('1')
]);
```

### Async Iterator
- Triển khai giao diện Async Iterator bằng phương thức `[Symbol.asyncIterator]()`.
- Phương thức này trả về đối tượng có hàm `next(): Promise<IteratorResult<T>>`.
- Lặp qua các phần tử bất đồng bộ bằng cú pháp `for await (const item of asyncIterable)`.

```typescript
const asyncCounter = {
  max: 3,
  [Symbol.asyncIterator]() {
    let current = 1;
    const max = this.max;

    return {
      async next(): Promise<IteratorResult<number>> {
        if (current <= max) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

async function runCounter() {
  for await (const num of asyncCounter) {
    console.log(num); // In ra lần lượt 1, 2, 3 mỗi giây một số
  }
}
```

### Async Generator
- Sử dụng cú pháp hàm `async function*` kết hợp từ khóa `yield`.
- Kiểu trả về là `AsyncGenerator<YieldType, ReturnType, NextType>`.
- Cung cấp cách thức ngắn gọn và tự nhiên hơn để tạo ra chuỗi giá trị bất đồng bộ so với việc tự viết Iterator thủ công.

```typescript
async function* generateNumbers(max: number): AsyncGenerator<number, void, unknown> {
  for (let i = 1; i <= max; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i;
  }
}

async function consumeNumbers() {
  const stream = generateNumbers(3);
  for await (const num of stream) {
    console.log(`Number: ${num}`);
  }
}
```
