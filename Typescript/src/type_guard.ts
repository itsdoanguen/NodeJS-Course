class dog {
    bark() {
        console.log("Woof!");
    }
}

class cat {
    meow() {
        console.log("Meow!");
    }
}

function makeSound_with_instanceof(animal: dog | cat) {
    if (animal instanceof dog) {
        animal.bark();
    } else if (animal instanceof cat) {
        animal.meow();
    }
}

function makeSound_with_in(animal: dog | cat) {
    if ("bark" in animal) {
        animal.bark();
    } else if ("meow" in animal) {
        animal.meow();
    }
}
//an example of using the type guard