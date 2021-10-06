import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinMax } from '../misc/models/MinMax';
import MsgBox from '../components/MsgBox/MsgBox';
import Range from '../components/Range/Range';
import { getExercise2State } from '../exercises/store/exercise2/exercise2.selectors';
import { loadExercise2Options } from '../exercises/store/exercise2/exercise2.slice';
import { CURRENCY_SYMBOL } from '../misc/constants';

const Exercise2: FC = () => {
  const [rangeSelected, setRangeSelected] = useState<{
    min: number;
    max: number;
  }>();

  const onChangeHandler = (ev: MinMax) => {
    setRangeSelected(ev);
  };

  const dispatch = useDispatch();

  const exercise2State = useSelector(getExercise2State);

  useEffect(() => {
    dispatch(loadExercise2Options());
  }, [dispatch]);

  return (
    <div className="exercise2">
      <h1>Exercise 2</h1>
      <MsgBox type="error">{exercise2State.error}</MsgBox>
      <MsgBox type="info">{exercise2State.isLoading ? 'Loading...' : null}</MsgBox>
      <Range
        options={exercise2State.options}
        value={rangeSelected}
        onChange={onChangeHandler}
        unit={CURRENCY_SYMBOL}
      />

      {rangeSelected !== undefined && (
        <p>
          Selected values: {rangeSelected?.min} - {rangeSelected?.max}
        </p>
      )}
    </div>
  );
};

export default Exercise2;
