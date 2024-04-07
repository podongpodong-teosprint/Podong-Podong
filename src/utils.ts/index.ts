export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  else return `UNKNOWN ERROR: ${String(error)}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepSearch = (obj: any = {}, key: string): any => {
  if (typeof obj !== 'object') return undefined;
  if (key in obj) return obj[key];
  for (const n of Object.values(obj)
    .filter(Boolean)
    .filter((v) => typeof v === 'object')) {
    const found = deepSearch(n, key);
    if (found) return found;
  }
  return undefined;
};
