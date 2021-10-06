import React, { FC, FocusEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

const InvisibleInputContainer = styled.div`
  .span-input {
    border: none;
    display: inline;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    width: 100%;
    min-width: 1.5ch;
    transition: width 0.5s;

    & {
      -moz-appearance: textfield;
    }
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:disabled {
      color: inherit;
    }

    &:focus {
      border: none;
      outline: none;
    }
  }
`;

export interface InvisibleInputProps {
  value: number;
  unit?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const InvisibleInput: FC<InvisibleInputProps> = ({
  value,
  unit,
  onChange,
  disabled,
  ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(value.toString());

  useEffect(() => {
    setInternalValue(value.toString());
  }, [value]);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(ev.target.value);

    if (!isNaN(ev.target.valueAsNumber)) {
      if (onChange) {
        onChange(ev);
      }
    }
  };

  const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    setInternalValue(value.toString());
  };

  return (
    <InvisibleInputContainer>
      <input
        className="span-input"
        type="number"
        value={internalValue}
        aria-label={ariaLabel}
        onChange={(ev) => handleOnChange(ev)}
        onBlur={(ev) => handleOnBlur(ev)}
        style={{
          width: `${internalValue.toString().length}ch`,
        }}
        disabled={disabled}
      ></input>
      <span>{unit}</span>
    </InvisibleInputContainer>
  );
};

export default InvisibleInput;
