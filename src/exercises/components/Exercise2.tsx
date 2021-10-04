import React, { FC } from 'react';
import Range from '../../components/Range';

const Exercise2: FC = () => {
  const onChangeHandler = (ev: { min: number; max: number }) => {
    console.log('handler', ev);
  };

  return (
    <>
      <span>Exercise 2</span>
      <Range
        options={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
        value={{ min: 5.99, max: 50.99 }}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default Exercise2;
