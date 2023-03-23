export const countDiscountedPrice = (p: number, d: number): number => {
  return p - Math.floor((p * d) / 100);
};
