import { renderHook } from "@testing-library/react-hooks";
import { useShortenName } from "../../utils/useShortenNameNew";

const renderUseShortenName = nameToBeShortened => {
  return renderHook(() => useShortenName(nameToBeShortened));
};

describe("shortenName function", () => {
  it("should return empty string when name is empty", () => {
    const name = "";
    const { result } = renderUseShortenName(name);
    expect(result.current).toBeFalsy();
  });
  it("should shorten a name where all words can be abbreviated", () => {
    const name = "Auto Spare Trading Company Sole Proprietorship Free Zone LLC";
    const expected = "Auto Spare TRDG CO SP FZ LLC";
    const { result } = renderUseShortenName(name);
    expect(result.current.trim()).toEqual(expected);
  });

  it("should handle a name where some words cannot be abbreviated", () => {
    const name = "Auto Spare Trading Company Sole Proprietorship XYZ LLC";
    const expected = "Auto Spare TRDG CO SP XYZ LLC";
    const { result } = renderUseShortenName(name);
    expect(result.current.trim()).toEqual(expected);
  });

  it("should handle a name where multiple words need to be combined to form an abbreviation", () => {
    const name = "Auto Spare Trading Company Sole Proprietorship Branch Retail";
    const expected = "Auto Spare TRDG CO SP BR RTL";
    const { result } = renderUseShortenName(name);
    expect(result.current.trim()).toEqual(expected);
  });

  it("should handle a name containing only one word", () => {
    const name = "Trading";
    const expected = "TRDG";
    const { result } = renderUseShortenName(name);
    expect(result.current.trim()).toEqual(expected);
  });
  it("should handle a name containing only one word", () => {
    const name = "Auto Spare TRDG CO SP BR RTL";
    const expected = "Auto Spare TRDG CO SP BR RTL";
    const { result } = renderUseShortenName(name);
    expect(result.current.trim()).toEqual(expected);
  });

  it("should handle a name that contains special characters", () => {
    const name =
      "SRT & CONSTRUCTION ALL KIND BUILDING PROJECTS CONTRACTING - (SOLE PROPRIETORSHIP LLC.)";
    const expected = "SRT & CNSTR ALL KIND BLDG PROJECTS CONT - (SP LLC.)";
    const { result } = renderUseShortenName(name);
    expect(result.current.trim()).toEqual(expected);
  });
});
