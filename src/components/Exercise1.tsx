import React, { FC, useEffect, useState } from 'react';
import Range from '../../../ui/components/range/Range';
import { useDispatch, useSelector } from 'react-redux';
import { getExercise1State } from '../../store/exercise1/exercise1.selectors';
import { loadExercise1Options } from '../../store/exercise1/exercise1.slice';
import MsgBox from '../../../ui/components/MsgBox/MsgBox';

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
        unit="€"
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
