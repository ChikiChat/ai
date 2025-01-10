export function assert<T>(
    shouldBeTruthy: T,
    message?: string,
): asserts shouldBeTruthy {
    if (!shouldBeTruthy) {
        throw new Error(message);
    }
}