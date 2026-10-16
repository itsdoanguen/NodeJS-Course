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

/*
unknown serves as the type-safe counterpart to any. While it accepts values of any shape, TypeScript disallows property reads, arithmetic operations, or method invocations on an unknown reference. Developers must narrow the type via runtime guards (such as typeof, Array.isArray, or the in operator) or perform an explicit assertion before the compiler permits access to underlying properties.
*/

