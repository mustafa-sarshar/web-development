function fibonacci(n) {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

const CalcFib = (iterations, idx) => {
  return new Promise((resolve) => {
    const timeStart = Date.now();
    const result = fibonacci(iterations);
    console.log(`CalcFib(idx=${idx}) done at ${Date.now() - timeStart}ms`);
    resolve(result);
  });
};

const main = async () => {
  const timeStart = Date.now();

  const results = await Promise.all([
    CalcFib(40, 0),
    CalcFib(40, 1),
    CalcFib(40, 2),
    CalcFib(40, 3),
    CalcFib(40, 4),
    CalcFib(40, 5),
    CalcFib(40, 6),
    CalcFib(40, 7),
    CalcFib(40, 8),
    CalcFib(40, 9),
  ]);

  console.log("Results:", results);
  console.log(`All calcs done in ${Date.now() - timeStart}ms`);
};

main().catch((error) => console.error(error));

CalcFib(40, 10);
CalcFib(40, 11);
CalcFib(40, 12);
