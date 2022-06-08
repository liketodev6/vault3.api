export const reverseStr = (str: string, join: string) => {
  return str.split(join).reverse().join(join);
};