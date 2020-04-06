import forge from "node-forge";

import { encryptPayload, decrypt, encryptSymmetricKey } from "../../src/api/crypto";

describe("crypto utils test", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should encrypt payload", () => {
    const payload = "some payload";
    const symKey = "some sym key";

    const startSpy = jest.fn();
    const updateSpy = jest.fn();
    const finishSpy = jest.fn();
    const createCipherSpy = jest.spyOn(forge.cipher, "createCipher").mockReturnValue({
      start: startSpy,
      update: updateSpy,
      finish: finishSpy,
      output: { data: "some data" }
    });
    const encodeUtf8Spy = jest
      .spyOn(forge.util, "encodeUtf8")
      .mockReturnValue("some encode utf8 data");
    const createBufferSpy = jest.spyOn(forge.util, "createBuffer").mockReturnValue("some buffer");
    const encodeSpy = jest.spyOn(forge.util, "encode64").mockReturnValue("some encode base64 data");

    expect(encryptPayload(payload, symKey)).toBe("some encode base64 data");
    expect(createCipherSpy).toHaveBeenCalledWith("AES-ECB", symKey);
    expect(startSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith("some buffer");
    expect(finishSpy).toHaveBeenCalled();
    expect(encodeUtf8Spy).toHaveBeenCalledWith(payload);
    expect(createBufferSpy).toHaveBeenCalledWith("some encode utf8 data");
    expect(encodeSpy).toHaveBeenCalledWith("some data");
  });

  it("should decrypt payload", () => {
    const payload = "some payload";
    const symKey = "some sym key";

    const startSpy = jest.fn();
    const updateSpy = jest.fn();
    const finishSpy = jest.fn();
    const createCipherSpy = jest.spyOn(forge.cipher, "createDecipher").mockReturnValue({
      start: startSpy,
      update: updateSpy,
      finish: finishSpy,
      output: "some data"
    });
    const decode64Spy = jest
      .spyOn(forge.util, "decode64")
      .mockReturnValue("some decode base64 data");
    const createBufferSpy = jest.spyOn(forge.util, "createBuffer").mockReturnValue("some buffer");

    expect(decrypt(symKey, payload)).toBe("some data");
    expect(createCipherSpy).toHaveBeenCalledWith("AES-ECB", symKey);
    expect(startSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith("some buffer");
    expect(finishSpy).toHaveBeenCalled();
    expect(decode64Spy).toHaveBeenCalledWith(payload);
    expect(createBufferSpy).toHaveBeenCalledWith("some decode base64 data");
  });

  it("should encrypt sym key", () => {
    const pem = "some pem";
    const symKey = "some sym key";

    const encodeSpy = jest.fn().mockReturnValue("some encode data");
    const encodeUtf8Spy = jest
      .spyOn(forge.util, "encodeUtf8")
      .mockReturnValue("some encode utf8 data");
    const publicKeySpy = jest.spyOn(forge.pki, "publicKeyFromPem").mockReturnValue({
      encrypt: encodeSpy
    });
    const encode64Spy = jest
      .spyOn(forge.util, "encode64")
      .mockReturnValue("some encode base64 data");

    expect(encryptSymmetricKey(pem, symKey)).toBe("some encode base64 data");
    expect(publicKeySpy).toHaveBeenCalledWith(pem);
    expect(encodeUtf8Spy).toHaveBeenCalledWith(symKey);
    expect(encodeSpy).toHaveBeenCalledWith("some encode utf8 data");
    expect(encode64Spy).toHaveBeenCalledWith("some encode data");
  });
});
