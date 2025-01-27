export const formatJsonData = ({ stackTrace = [], status }) => {
  const stack = stackTrace.map(
    ({ methodName, fileName, lineNumber }) =>
      `Method: ${methodName}, file: ${fileName}, line: ${lineNumber}`
  );

  return {
    status,
    stackTrace: stack.length ? `StackTrace: ${stack.join(", ")}` : ""
  };
};
