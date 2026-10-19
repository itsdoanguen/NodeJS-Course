type student_name = string;
type student_id = number;

type student = {
  name: student_name;
  id: student_id;
};

const student1_name: student_name = "Alice";
const student1_id: student_id = 101;
const student1: student = {
  name: student1_name,
  id: student1_id
};

//Example of using type aliases

type course_name = string;
type course_id = number;

interface course {
  name: course_name;
  id: course_id;
}

const math_course: course = {
  name: "Mathematics",
  id: 201
};

//Example of using interfaces

interface Animal { name: string; }
interface Animal { age: number; }

const merge_animal: Animal = {
  name: "Buddy",
  age: 5
};

interface Dog extends Animal { breed: string; }

const border_collie: Dog = {
  name: "Max",
  age: 3,
  breed: "Border Collie"
};

//Example of interface merging and extending


/* random kiến thức về type alias và interface

dù 2 thằng này nó có vẻ giống và có thể thay thế nhau trong một số trường hợp nhma có một số điểm khác biệt cần lưu ý:
- trong khi interface dùng chủ yếu cho object shapes và function/method signatures, type alias có thể dùng cho bất kỳ kiểu dữ liệu nào, kể cả primitive types, union types, tuple types, v.v.
ví dụ như cái này: 
// Type làm được nhưng Interface KHÔNG làm được:
type StringOrNumber = string | number;
type Coordinates = [x: number, y: number];


*/