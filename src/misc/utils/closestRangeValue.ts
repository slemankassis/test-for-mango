import { RangeValue } from '../models/RangeValue';

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
