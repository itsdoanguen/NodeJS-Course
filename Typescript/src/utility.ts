interface Point{
    point_x: number;
    point_y: number;
    point_z?: number; // Optional property
}

//@ts-expect-error: missing property 'point_y' in type '{ point_x: number; }' but required in type 'Point'.
const myPoint: Point = {
    point_x: 10
};

let anotherPoint: Partial<Point> = {
    point_x: 20
}; //No error because 'point_y' is optional in 'Partial<Point>'.

//@ts-expect-error: although 'point_z' is optional in 'Point', it is required in 'Required<Point>'.
let missingZPoint: Required<Point> = {
    point_x: 30,
    point_y: 40
}; 
//Required<Point> makes all properties of Point required, so 'point_z' must be provided.

let thisPointGetOmited: Omit<Point, 'point_y'> = {
    point_x: 50,
    point_z: 60
}; //No error because 'point_z' is omitted from the type.

let thisPointPick: Pick<Point, 'point_z'> = {
    
}; //Pick point_z from Point, but since it's optional, no error occurs even if it's not provided. Ofcourse, point_x and point_y are not included in this type, so they cannot be assigned to thisPointPick.



//Return type of a function can be inferred using the ReturnType utility type. This is useful when you want to capture the return type of a function without explicitly defining it.
type pointGerenator = () => Point;
const generatePoint: pointGerenator = () => {
    return {
        point_x: 70,
        point_y: 80
    };
}


//Parameters of a function can be inferred using the Parameters utility type. This is useful when you want to capture the parameter types of a function without explicitly defining them.
type pointPrinter = (point: Point) => void;
const pointPrint: Parameters<pointPrinter>[0] = {
    point_x: 90,
    point_y: 100
};