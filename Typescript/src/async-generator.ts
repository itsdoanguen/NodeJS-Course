async function* generateNumbers(max: number): AsyncGenerator<number, void, unknown> {
  for (let i = 1; i <= max; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i; 
  }
}

async function consume() {
  const numberStream = generateNumbers(3);

  for await (const num of numberStream) {
    console.log(`Number: ${num}`);
  }
}