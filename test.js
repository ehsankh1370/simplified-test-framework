function describe(testSuiteName, func) {
  try {
    func();
    console.log(`successfully completed test suite ${testSuiteName}}`);
  } catch (error) {
    console.error(
      `failed running test suit ${testSuiteName} on test case ${error.testCaseName} with error message ${error.errorMessage}`
    );
  }
}

function it(testCaseName, func) {
  try {
    func();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (error) {
    throw {
      errorMessage: error,
      testCaseName,
    };
  }
}

function expect(actual) {
  return {
    toBeDefined: () =>
      conditionChecker(actual !== undefined, `${actual} is not defined`),
    toBe: (expected) =>
      conditionChecker(
        Object.is(actual, expected),
        `${actual} is not equal to ${expected}`
      ),
    toBeType: (received) =>
      conditionChecker(
        typeof actual === typeof type,
        `type ${typeof actual} is not equal to ${typeof received}`
      ),
    toBeFalsy: () =>
      conditionChecker(
        !actual,
        `${JSON.stringify(actual)} is not a falsy value`
      ),
    toBeTruthy: () =>
      conditionChecker(
        !!actual,
        `${JSON.stringify(actual)} is not a truthy value`
      ),
  };
}

function conditionChecker(condition, error) {
  if (!condition) {
    throw error;
  }
}
