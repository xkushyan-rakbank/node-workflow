export const getOcrFieldValueBySource = (node, source) => {
  return node?.find(x => x?.source === source)?.value || "";
};

export const removeEncodingPrefix = imgStr => imgStr.replace("data:image/jpeg;base64,", "");
