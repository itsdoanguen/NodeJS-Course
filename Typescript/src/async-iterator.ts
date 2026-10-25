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
    console.log(num); // In ra 1, sau 1s in ra 2, sau 1s in ra 3
  }
}

runCounter();