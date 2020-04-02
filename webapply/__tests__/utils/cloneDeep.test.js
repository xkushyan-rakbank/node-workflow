import { cloneDeep } from "../../src/utils/cloneDeep";

describe("cloneDeep test", () => {
  it("should return default value when value is not an object", () => {
    const obj = null;
    expect(cloneDeep()).toBeUndefined();
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });

  it("should return cloned Date object when value is instance of Date", () => {
    const obj = new Date();
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });

  it("should return cloned array when value is array", () => {
    const obj = [1, { a: 2 }, null];
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });

  it("should return cloned object when values is object", () => {
    const obj = { a: undefined, b: 2 };
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });
});
