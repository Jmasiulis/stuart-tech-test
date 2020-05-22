export const validateNumberData = (value: number, key: string): Promise<never> | number => {
  if (isNaN(value)) {
    return Promise.reject(`${key} cannot be not a number.`);
  }
  
  if (value <= 0) {
    return Promise.reject(`${key} cannot be less or equal to zero.`);
  }

  return value;
}