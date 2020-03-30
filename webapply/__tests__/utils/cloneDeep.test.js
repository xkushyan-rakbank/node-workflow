import { cloneDeep } from "../../src/utils/cloneDeep";

describe("cloneDeep test", () => {
  it("should return default value", () => {
    const obj = null;
    expect(cloneDeep()).toBeUndefined();
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });

  it("should return Date object", () => {
    const obj = new Date();
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });

  it("should return array", () => {
    const obj = [1, { a: 2 }, null];
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });

  it("should return object", () => {
    const obj = { a: undefined, b: 2 };
    expect(cloneDeep(obj)).toStrictEqual(obj);
  });
});
