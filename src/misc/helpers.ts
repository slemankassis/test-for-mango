import { RangeValue } from './models/RangeValue';

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

export function closestRangeValueByPercentage(
  percentage: number,
  rangeValues: RangeValue[],
): RangeValue {
  return rangeValues.reduce((prev, curr) => {
    return Math.abs(curr.percent - percentage) < Math.abs(prev.percent - percentage)
      ? curr
      : prev;
  });
}

export function closestRangeValueByValue(
  value: number,
  rangeValues: RangeValue[],
): RangeValue {
  return rangeValues.reduce((prev, curr) => {
    return Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev;
  });
}
