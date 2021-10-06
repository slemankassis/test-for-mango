import React from 'react';
import { cleanup, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import InvisibleInput from './InvisibleInput';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

const setup = () => {
  const utils = render(
    <InvisibleInput value={100} unit="€" ariaLabel="test input" />,
  );
  const input = utils.getByLabelText('test input');
  return {
    input,
    ...utils,
  };
};

describe('InvisibleInput operations', () => {
  test('should show the value', () => {
    const { getByDisplayValue } = setup();

    expect(getByDisplayValue(100)).toHaveValue(100);
  });

  test('should show the correct unit', () => {
    const { getByText } = setup();

    expect(getByText(/€/i).textContent).toBe('€');
  });

  test('should user can clear the input', () => {
    const { input } = setup();

    userEvent.clear(input);

    expect(input).toHaveValue(null);
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

    rerender(<InvisibleInput value={999} ariaLabel="test input" />);

    expect(input).toHaveValue(999);
  });

  test('should not modify user input when the same value comming from props', () => {
    const { input, rerender } = setup();

    userEvent.clear(input);
    userEvent.type(input, '12');

    rerender(<InvisibleInput value={100} ariaLabel="test input" />);

    expect(input).toHaveValue(12);
  });

  test('should be disabled', () => {
    const { getByLabelText } = render(
      <InvisibleInput value={100} unit="€" ariaLabel="test input" disabled={true} />,
    );

    expect(getByLabelText('test input')).toBeDisabled();
  });
});

describe('InvisibleInput snapshots', () => {
  test('snapshot match', () => {
    const tree = TestRenderer.create(<InvisibleInput value={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
