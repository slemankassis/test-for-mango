import React, { FC, useEffect, useState, useRef } from 'react';
import InvisibleInput from '../InvisibleInput/InvisibleInput';
import styled from 'styled-components';
import RangeControl from '../RangeControl';
import { generatePercentages } from '../../misc/helpers';
import { RangeValue } from '../../misc/models/RangeValue';
import {
  closestRangeValueByPercentage,
  closestRangeValueByValue,
} from '../../misc/helpers';
import { MinMax } from '../../misc/models/MinMax';

enum RangeControls {
  MIN,
  MAX,
}

function useEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options: boolean | AddEventListenerOptions = false,
): void {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return function cleanup() {
      window.removeEventListener(type, listener);
    };
  });
}

const RangeStyles = styled.div`
  .range {
    display: flex;
    user-select: none;
    padding: 1em 0;

    &.m-disabled {
      position: relative;
      opacity: 0.6;

      &::before {
        content: '';
        position: absolute;
        z-index: 2;
        cursor: not-allowed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      & > * {
        pointer-events: none;
      }
    }

    &__boundaries {
      max-width: 100%;
    }

    &__bar {
      flex-grow: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 1em;
      min-width: 100px;

      &__control {
        position: absolute;
      }

      &__rail {
        border-radius: 5px;
        height: 5px;
        background-color: #000;
      }
    }
  }
`;

export interface RangeProps {
  options?: number[] | MinMax;
  value?: MinMax;
  onChange?: (e: MinMax) => void;
  unit?: string;
  disabled?: boolean;
}

interface RangeState {
  /** Tells if user can edit max and min inputs */
  inputEditable: boolean;
  limitMin: number;
  limitMax: number;
  options: RangeValue[];
  released: boolean;
  minPos: number;
  maxPos: number;
  disabled: boolean;
  minVal: number;
  maxVal: number;
  lastActiveControl?: RangeControls;
}

const Range: FC<RangeProps> = ({ options, value, onChange, unit, disabled }) => {
  const rangeBarRef = useRef<HTMLDivElement>(null);

  const [rangeState, setRangeState] = useState<RangeState>({
    inputEditable: true,
    limitMin: 0,
    limitMax: 0,
    options: [],
    released: true,
    minPos: 0,
    maxPos: 100,
    disabled: false,
    minVal: 0,
    maxVal: 0,
    lastActiveControl: undefined,
  });

  useEffect(() => {
    let newOptions: RangeValue[];
    let inputEditable = false;

    if (!options) {
      setRangeState((oldRangeState) => {
        return {
          ...oldRangeState,
          disabled: true,
          inputEditable: false,
        };
      });
      return;
    }

    if (Array.isArray(options)) {
      inputEditable = false;
      newOptions = generatePercentages(options);
    } else if (options && !isNaN(options?.max) && !isNaN(options?.min)) {
      // Validate that in fact `min` is minor than `max`
      const min = Math.min(options.min, options.max);
      const max = Math.max(options.min, options.max);
      let steps: number[] = [];

      for (let i = min; i <= max; i++) {
        steps = [...steps, i];
      }

      inputEditable = true;
      newOptions = generatePercentages(steps);
    } else {
      throw new Error('options must be number[] or {min: number, max: number}');
    }

    if (newOptions) {
      const limitMin = newOptions[0]?.value;
      const limitMax = newOptions[newOptions.length - 1]?.value;
      const minVal = value?.min ?? limitMin;
      const maxVal = value?.max ?? limitMax;

      setRangeState((oldRangeState) => {
        return {
          ...oldRangeState,
          limitMin,
          limitMax,
          minVal,
          maxVal,
          maxPos: closestRangeValueByValue(maxVal, newOptions).percent,
          minPos: closestRangeValueByValue(minVal, newOptions).percent,
          inputEditable,
          options: newOptions,
          disabled: !!disabled,
        };
      });
    }
  }, [options, value, disabled]);

  const onStartMoving = (el: RangeControls) => {
    setRangeState((oldRangeState) => {
      return {
        ...oldRangeState,
        released: false,
        lastActiveControl: el,
      };
    });
  };

  const onMoving = (
    ev:
      | React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!rangeState.released) {
      if (rangeBarRef.current) {
        const leftSpace = rangeBarRef.current.offsetLeft;
        const rangeWidth = rangeBarRef.current.clientWidth;
        const clientX: number =
          ev.nativeEvent instanceof TouchEvent
            ? (ev as any).touches[0].clientX
            : ev.nativeEvent instanceof MouseEvent
            ? (ev as any).clientX
            : 0;

        const percentajeReal = 100 / (rangeWidth / (clientX - leftSpace));
        let percentaje = percentajeReal;
        if (percentajeReal > 100) {
          percentaje = 100;
        } else if (percentajeReal < 0) {
          percentaje = 0;
        }

        if (rangeState.lastActiveControl === RangeControls.MIN) {
          if (percentaje > rangeState.maxPos) {
            percentaje = rangeState.maxPos;
          }

          const minValue = closestRangeValueByPercentage(
            percentaje,
            rangeState.options,
          );

          setRangeState((oldRangeState) => {
            return {
              ...oldRangeState,
              minPos: percentaje,
              lastActiveControl: RangeControls.MIN,
              minVal: minValue.value,
            };
          });
        } else if (rangeState.lastActiveControl === RangeControls.MAX) {
          if (percentaje < rangeState.minPos) {
            percentaje = rangeState.minPos;
          }

          const maxValue = closestRangeValueByPercentage(
            percentaje,
            rangeState.options,
          );

          setRangeState((oldRangeState) => {
            return {
              ...oldRangeState,
              maxPos: percentaje,
              lastActiveControl: RangeControls.MAX,
              maxVal: maxValue.value,
            };
          });
        }
      }
    }
  };

  const onStopMoving = () => {
    if (!rangeState.released) {
      const minValue = closestRangeValueByPercentage(
        rangeState.minPos,
        rangeState.options,
      );
      const maxValue = closestRangeValueByPercentage(
        rangeState.maxPos,
        rangeState.options,
      );

      setRangeState((oldRangeState) => {
        return {
          ...oldRangeState,
          released: true,
          minPos: minValue.percent,
          maxPos: maxValue.percent,
          minVal: minValue.value,
          maxVal: maxValue.value,
        };
      });

      emitValue({
        min: minValue.value,
        max: maxValue.value,
      });
    }
  };

  useEvent('mouseup', onStopMoving);

  const emitValue = (val: MinMax) => {
    if (onChange) {
      onChange(val);
    }
  };

  const handleTextInputMin = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = ev.target.valueAsNumber;

    if (newValue > rangeState.maxVal) {
      newValue = rangeState.maxVal;
    }

    const newRangeValue = closestRangeValueByValue(newValue, rangeState.options);

    setRangeState((oldRangeState) => {
      return {
        ...oldRangeState,
        minPos: newRangeValue.percent,
        minVal: newRangeValue.value,
        lastActiveControl: RangeControls.MIN,
      };
    });

    emitValue({
      max: rangeState.maxVal,
      min: newRangeValue.value,
    });
  };

  const handleTextInputMax = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = ev.target.valueAsNumber;

    if (newValue < rangeState.minVal) {
      newValue = rangeState.minVal;
    }

    const newRangeValue = closestRangeValueByValue(newValue, rangeState.options);

    setRangeState((oldRangeState) => {
      return {
        ...oldRangeState,
        maxPos: newRangeValue.percent,
        maxVal: newRangeValue.value,
        lastActiveControl: RangeControls.MAX,
      };
    });

    emitValue({
      max: newRangeValue.value,
      min: rangeState.minVal,
    });
  };

  return (
    <RangeStyles>
      <div
        className={`range ${rangeState.disabled ? 'm-disabled' : ''}`}
        onMouseMove={(ev) => {
          onMoving(ev);
        }}
        onTouchMove={(ev) => {
          onMoving(ev);
        }}
        onTouchEnd={onStopMoving}
        onTouchCancel={onStopMoving}
        aria-label="range-selector"
      >
        <InvisibleInput
          value={rangeState.minVal}
          onChange={handleTextInputMin}
          unit={unit}
          disabled={!rangeState.inputEditable || disabled}
          ariaLabel="range input min"
        />
        <div className="range__bar" ref={rangeBarRef}>
          <RangeControl
            aria-label="range control min"
            onMouseDown={() => {
              onStartMoving(RangeControls.MIN);
            }}
            onTouchStart={() => {
              onStartMoving(RangeControls.MIN);
            }}
            className="range__bar__control m-min"
            style={{
              zIndex: rangeState.lastActiveControl === RangeControls.MIN ? 1 : 0,
              left: `${rangeState.minPos}%`,
            }}
          />

          <RangeControl
            aria-label="range control max"
            onMouseDown={() => {
              onStartMoving(RangeControls.MAX);
            }}
            onTouchStart={() => {
              onStartMoving(RangeControls.MAX);
            }}
            className="range__bar__control m-max"
            style={{
              zIndex: rangeState.lastActiveControl === RangeControls.MAX ? 1 : 0,
              left: `${rangeState.maxPos}%`,
            }}
          />

          <div className="range__bar__rail"></div>
        </div>

        <InvisibleInput
          value={rangeState.maxVal}
          onChange={handleTextInputMax}
          unit={unit}
          disabled={!rangeState.inputEditable || disabled}
          ariaLabel="range input max"
        />
      </div>
    </RangeStyles>
  );
};

export default Range;
