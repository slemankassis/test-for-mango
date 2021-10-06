import { RangeValue } from '../models/RangeValue';

export function generatePercentages(arr: number[]): RangeValue[] {
  const sortedArr = [...arr].sort((a, b) => a - b);

  const mul = 100 / (sortedArr[sortedArr.length - 1] - sortedArr[0]);
  return sortedArr.map((value) => {
    return {
      value,
      percent: (value - sortedArr[0]) * mul,
    };
  });
}
