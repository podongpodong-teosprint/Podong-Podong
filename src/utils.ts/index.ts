export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  else return `UNKNOWN ERROR: ${String(error)}`;
};
