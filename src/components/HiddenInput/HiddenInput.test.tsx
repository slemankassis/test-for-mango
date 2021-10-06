import React from 'react';
import { cleanup, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import HiddenInput from './HiddenInput';
import userEvent from '@testing-library/user-event';
import { CURRENCY_SYMBOL } from '../../misc/constants';

afterEach(cleanup);

const setup = () => {
  const utils = render(
    <HiddenInput value={100} unit={CURRENCY_SYMBOL} ariaLabel="test input" />,
  );
  const input = utils.getByLabelText('test input');
  return {
    input,
    ...utils,
  };
};

describe('HiddenInput operations', () => {
  test('should show the value', () => {
    const { getByDisplayValue } = setup();

    expect(getByDisplayValue(100)).toHaveValue(100);
  });

  test('should show the correct unit', () => {
    const { getByText } = setup();

    expect(getByText(/€/i).textContent).toBe('€');
  });

  test('should be disabled', () => {
    const { getByLabelText } = render(
      <HiddenInput value={100} unit="€" ariaLabel="test input" disabled={true} />,
    );

    expect(getByLabelText('test input')).toBeDisabled();
  });

  test('should allow numbers', () => {
    const { input } = setup();

    userEvent.clear(input);
    userEvent.type(input, '12');

    expect(input).toHaveValue(12);
  });

  test('should not allow non numeric characters', () => {
    const { input } = setup();

    userEvent.clear(input);
    userEvent.type(input, 'abc');

    expect(input).toHaveValue(null);
  });

  test('should show a new value comming from props', () => {
    const { input, rerender } = setup();

    userEvent.clear(input);
    userEvent.type(input, '12');

    rerender(<HiddenInput value={999} ariaLabel="test input" />);

    expect(input).toHaveValue(999);
  });

  test('should not modify user input when the same value comming from props', () => {
    const { input, rerender } = setup();

    userEvent.clear(input);
    userEvent.type(input, '12');

    rerender(<HiddenInput value={100} ariaLabel="test input" />);

    expect(input).toHaveValue(12);
  });

  test('should user can clear the input', () => {
    const { input } = setup();

    userEvent.clear(input);

    expect(input).toHaveValue(null);
  });
});

describe('HiddenInput snapshots', () => {
  test('snapshot match', () => {
    const tree = TestRenderer.create(<HiddenInput value={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
