import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import Range, { RangeProps } from './Range';

afterEach(cleanup);

const setup = (props?: RangeProps) => {
  const utils = render(<Range {...props} />);
  const minInput = utils.getByLabelText('range input min');
  const maxInput = utils.getByLabelText('range input max');
  const minControl = utils.getByLabelText('range control min');
  const maxControl = utils.getByLabelText('range control max');
  return {
    minInput,
    maxInput,
    minControl,
    maxControl,
    ...utils,
  };
};

describe('Range snapshots', () => {
  test('snapshot empty range match', () => {
    const tree = TestRenderer.create(<Range />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot MinMax range match', () => {
    const tree = TestRenderer.create(
      <Range value={{ min: 15, max: 89 }} options={{ min: 1, max: 100 }} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot Number[] range match', () => {
    const tree = TestRenderer.create(
      <Range value={{ min: 15, max: 89 }} options={[2, 15, 78, 89]} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot disabled range match', () => {
    const tree = TestRenderer.create(<Range disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Range props', () => {
  test('should show the unit', () => {
    const { getAllByText } = setup({ unit: '€' });
    expect(getAllByText(/€/i)[0].textContent).toBe('€');
  });

  test('should choose max and min correctly in number[]', () => {
    const { maxInput, minInput } = setup({
      options: [10, 3, 5, 70, 8],
      value: undefined,
    });

    expect(minInput).toHaveValue(3);
    expect(maxInput).toHaveValue(70);
  });

  test('should choose max and min correctly in reversed MinMax', () => {
    const { maxInput, minInput } = setup({
      options: { min: 100, max: 1 },
      value: undefined,
    });

    expect(minInput).toHaveValue(1);
    expect(maxInput).toHaveValue(100);
  });
});

describe('Range controls', () => {
  test('should min value on top when used', () => {
    const { minControl, maxControl } = setup();

    fireEvent.mouseDown(minControl);

    const styleMinControl = window.getComputedStyle(minControl);
    const styleMaxControl = window.getComputedStyle(maxControl);

    expect(styleMinControl.zIndex).toBe('1');
    expect(styleMaxControl.zIndex).toBe('0');
  });

  test('should max value on top when used', () => {
    const { minControl, maxControl } = setup();

    fireEvent.mouseDown(maxControl);

    const styleMinControl = window.getComputedStyle(minControl);
    const styleMaxControl = window.getComputedStyle(maxControl);

    expect(styleMinControl.zIndex).toBe('0');
    expect(styleMaxControl.zIndex).toBe('1');
  });

  test('should min be at 0% and max at 100% when no value', () => {
    const { minControl, maxControl } = setup();

    const styleMinControl = window.getComputedStyle(minControl);
    const styleMaxControl = window.getComputedStyle(maxControl);

    expect(styleMinControl.left).toBe('0%');
    expect(styleMaxControl.left).toBe('100%');
  });

  test('should update zIndex with alternate clicks', () => {
    const { minControl, maxControl } = setup();

    fireEvent.mouseDown(maxControl);
    fireEvent.mouseDown(minControl);

    const styleMinControl = window.getComputedStyle(minControl);
    const styleMaxControl = window.getComputedStyle(maxControl);

    expect(styleMinControl.zIndex).toBe('1');
    expect(styleMaxControl.zIndex).toBe('0');
  });

  test('should change min value when moves min control', () => {
    const { minControl, minInput } = setup({ options: { min: 20, max: 40 } });

    expect(minInput).toHaveValue(20);

    fireEvent.mouseDown(minControl);
    fireEvent.mouseMove(minControl, { clientX: 100 });
    fireEvent.mouseUp(minControl);

    expect(minInput).toHaveValue(40);

    fireEvent.mouseDown(minControl);
    fireEvent.mouseMove(minControl, { clientX: -1 });
    fireEvent.mouseUp(minControl);

    expect(minInput).toHaveValue(20);
  });

  test('should change max value when moves max control', () => {
    const { maxControl, maxInput } = setup({
      options: { min: 20, max: 40 },
    });

    expect(maxInput).toHaveValue(40);

    fireEvent.mouseDown(maxControl);
    fireEvent.mouseMove(maxControl, { clientX: -100 });
    fireEvent.mouseUp(maxControl);

    expect(maxInput).toHaveValue(20);

    fireEvent.mouseDown(maxControl);
    fireEvent.mouseMove(maxControl, { clientX: 100 });
    fireEvent.mouseUp(maxControl);

    expect(maxInput).toHaveValue(40);
  });

  test('should mouseUp and mouseDown whitout move doesnt change the MIN value', () => {
    const { minControl, minInput } = setup({
      options: { min: 20, max: 40 },
    });

    fireEvent.mouseDown(minControl);
    fireEvent.mouseUp(minControl);

    expect(minInput).toHaveValue(20);
  });

  test('should mouseUp and mouseDown whitout move doesnt change the MAX value', () => {
    const { maxControl, maxInput } = setup({
      options: { min: 20, max: 40 },
    });

    fireEvent.mouseDown(maxControl);
    fireEvent.mouseUp(maxControl);

    expect(maxInput).toHaveValue(40);
  });
});

describe('Range disabled', () => {
  test('should Range be disabled with disabled=true prop', () => {
    const { getByLabelText, minInput, maxInput } = setup({
      options: { min: 1, max: 10 },
      disabled: true,
    });

    expect(getByLabelText('range-selector')).toHaveClass('m-disabled');
    expect(minInput).toBeDisabled();
    expect(maxInput).toBeDisabled();
  });

  test('should has class disabled with no options', () => {
    const { getByLabelText, minInput, maxInput } = setup();

    expect(getByLabelText('range-selector')).toHaveClass('m-disabled');
    expect(minInput).toBeDisabled();
    expect(maxInput).toBeDisabled();
  });
});
