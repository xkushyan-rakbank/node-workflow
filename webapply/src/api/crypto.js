import forge from "node-forge";

export const encryptPayload = (payload, symKey) => {
  const cipher = forge.cipher.createCipher("AES-ECB", symKey);

  cipher.start();
  cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(payload)));
  cipher.finish();

  return forge.util.encode64(cipher.output.data);
};

export const encryptSymmetricKey = (pem, symKey) => {
  const publicKey = forge.pki.publicKeyFromPem(pem);
  const encryptedSymKey = publicKey.encrypt(forge.util.encodeUtf8(symKey));
  const encryptedSymKey64 = forge.util.encode64(encryptedSymKey);

  return encryptedSymKey64;
};

/* istanbul ignore next */
export const encrypt = (pubKey, payload) => {
  const symKeyBytes = forge.random.getBytesSync(16);
  const symKey = forge.util.encode64(symKeyBytes);
  const encryptedPayload = encryptPayload(payload, symKey);
  const encryptedSymKey = encryptSymmetricKey(pubKey, symKey);

  return [encryptedPayload, encryptedSymKey, symKey];
};

export const decrypt = (symKey, payload) => {
  const cipher = forge.cipher.createDecipher("AES-ECB", symKey);

  cipher.start();
  cipher.update(forge.util.createBuffer(forge.util.decode64(payload)));
  cipher.finish();

  return cipher.output;
};
