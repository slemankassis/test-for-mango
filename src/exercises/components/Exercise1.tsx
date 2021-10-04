import React, { FC } from 'react';
import Range from '../../components/Range';

const Exercise1: FC = () => {
  const onChangeHandler = (ev: { min: number; max: number }) => {
    console.log('handler', ev);
  };

  return (
    <>
      <span>Exercise 1</span>
      <Range options={{ min: 1, max: 100 }} onChange={onChangeHandler} />
    </>
  );
};

export default Exercise1;
