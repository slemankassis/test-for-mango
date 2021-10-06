import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Range from '../components/Range/Range';
import MsgBox from '../components/MsgBox/MsgBox';
import { getExercise1State } from '../exercises/store/exercise1/exercise1.selectors';
import { loadExercise1Options } from '../exercises/store/exercise1/exercise1.slice';
import { CURRENCY_SYMBOL } from '../misc/constants';

const Exercise1: FC = () => {
  const [rangeSelected, setRangeSelected] = useState<{
    min: number;
    max: number;
  }>();

  const onChangeHandler = (ev: { min: number; max: number }) => {
    setRangeSelected(ev);
  };

  const dispatch = useDispatch();

  const exercise1State = useSelector(getExercise1State);

  useEffect(() => {
    dispatch(loadExercise1Options());
  }, [dispatch]);

  return (
    <div className="exercise1">
      <h1>Exercise 1</h1>
      <Range
        options={exercise1State.options}
        value={rangeSelected}
        onChange={onChangeHandler}
        unit={CURRENCY_SYMBOL}
      />

      <MsgBox type="error">{exercise1State.error}</MsgBox>
      <MsgBox type="info">{exercise1State.isLoading ? 'Loading...' : null}</MsgBox>

      {rangeSelected !== undefined && (
        <p>
          Selected values: {rangeSelected?.min} - {rangeSelected?.max}
        </p>
      )}
    </div>
  );
};

export default Exercise1;
