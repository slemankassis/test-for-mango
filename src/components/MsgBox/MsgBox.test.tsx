import React from 'react';
import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import MsgBox, { MsgBoxProps } from './MsgBox';

const setup = (msgBoxProps: MsgBoxProps) => {
  const utils = render(<MsgBox {...msgBoxProps}>test</MsgBox>);

  return {
    el: utils.getByText('test'),
    ...utils,
  };
};

describe('MsgBox check props', () => {
  test('should have class info', () => {
    const { el } = setup({ type: 'info' });

    expect(el).toHaveClass('m-info');
  });

  test('should have class error', () => {
    const { el } = setup({ type: 'error' });

    expect(el).toHaveClass('m-error');
  });

  test('should not exist when empty', () => {
    const { container } = render(<MsgBox type="info"></MsgBox>);

    expect(container.firstChild).toBe(null);
  });
});

describe('snapshots MsgBox', () => {
  test('snapshot empty error match', () => {
    const tree = TestRenderer.create(<MsgBox type="error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot empty info match', () => {
    const tree = TestRenderer.create(<MsgBox type="info" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot full error match', () => {
    const tree = TestRenderer.create(<MsgBox type="error">Test</MsgBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('snapshot full error match', () => {
    const tree = TestRenderer.create(<MsgBox type="info">Test</MsgBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
