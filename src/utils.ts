export const encodeRoute = (data: string): string => {
  return data
    .replace(/=/g, "^")
    .replace(/\//g, "=")
    .replace(/\?/g, ")")
    .replace(/\./g, "(");
};

export const decodeRoute = (enco: string): string => {
  return enco
    .replace(/=/g, "/")
    .replace(/\)/g, "?")
    .replace(/\^/g, "=")
    .replace(/\(/g, ".");
};
