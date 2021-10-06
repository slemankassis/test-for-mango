import React from 'react';
import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import AlertMessage, { AlertMessageProps } from './AlertMessage';

const setup = (msgBoxProps: AlertMessageProps) => {
  const utils = render(<AlertMessage {...msgBoxProps}>test</AlertMessage>);

  return {
    el: utils.getByText('test'),
    ...utils,
  };
};

describe('AlertMessage check props', () => {
  test('should have class info', () => {
    const { el } = setup({ type: 'info' });

    expect(el).toHaveClass('m-info');
  });

  test('should have class error', () => {
    const { el } = setup({ type: 'error' });

    expect(el).toHaveClass('m-error');
  });

  test('should not exist when empty', () => {
    const { container } = render(<AlertMessage type="info"></AlertMessage>);

    expect(container.firstChild).toBe(null);
  });
});

describe('snapshots AlertMessage', () => {
  test('snapshot empty error match', () => {
    const tree = TestRenderer.create(<AlertMessage type="error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot empty info match', () => {
    const tree = TestRenderer.create(<AlertMessage type="info" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot full error match', () => {
    const tree = TestRenderer.create(<AlertMessage type="error">Test</AlertMessage>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot full error match', () => {
    const tree = TestRenderer.create(<AlertMessage type="info">Test</AlertMessage>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
