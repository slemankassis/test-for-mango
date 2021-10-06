import React, { FC } from 'react';
import styled from 'styled-components';

const ColorBox = styled.div`
  color: #fff;
  padding: 0.5em 0.5em 0.3em;

  &.m-error {
    background-color: #ff4444;
    box-shadow: 0 8px #cc0000;
  }

  &.m-info {
    background-color: #33b5e5;
    box-shadow: 0 8px #0099cc;
  }
`;

enum AlertMessageType {
  error = 'm-error',
  info = 'm-info',
}

export interface AlertMessageProps {
  type: keyof typeof AlertMessageType;
}

const AlertMessage: FC<AlertMessageProps> = ({ children, type }) => {
  if (children) {
    return <ColorBox className={AlertMessageType[type]}>{children}</ColorBox>;
  } else {
    return null;
  }
};

export default AlertMessage;
