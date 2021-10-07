import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MinAndMax } from '../models/MinAndMax';
import { CURRENCY_SYMBOL } from '../misc/constants';
import AlertMessage from '../components/AlertMessage/AlertMessage';
import Range from '../components/Range/Range';
import { getExercise2State } from '../exercises/store/exercise2/selectors';
import { loadExercise2Options } from '../exercises/store/exercise2/slice';

const Exercise2: FC = () => {
  const [rangeSelected, setRangeSelected] = useState<{
    min: number;
    max: number;
  }>();

  const onChangeHandler = (ev: MinAndMax) => {
    setRangeSelected(ev);
  };

  const dispatch = useDispatch();

  const exercise2State = useSelector(getExercise2State);

  useEffect(() => {
    dispatch(loadExercise2Options());
  }, [dispatch]);

  return (
    <div className="exercise2">
      <span>Exercise 2</span>
      <AlertMessage type="error">{exercise2State.error}</AlertMessage>
      <AlertMessage type="info">
        {exercise2State.isLoading ? 'Loading...' : null}
      </AlertMessage>
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
