import React, { FC } from 'react';
import classnames from 'classnames';
import { makeStyles } from '@mui/styles';

// Version with Material UI instead of styled-components
const useStyles = makeStyles({
  alert: { color: '#FFFFF', padding: '0.5em 0.5em 0.3em' },
  error: { backgroundColor: '#ff4444', boxShadow: '0 8px red' },
  info: {
    backgroundColor: 'cornflowerblue',
    boxShadow: '0 8px blue',
  },
});

enum AlertMessageType {
  error = 'error',
  info = 'info',
}

export interface AlertMessageProps {
  type: keyof typeof AlertMessageType;
}

const AlertMessage: FC<AlertMessageProps> = ({ children, type }) => {
  const classes = useStyles();

  if (children) {
    return <div className={classnames(alert, classes[type])}>{children}</div>;
  } else {
    return null;
  }
};

export default AlertMessage;
