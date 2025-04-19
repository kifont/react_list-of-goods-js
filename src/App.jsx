import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_ALPHABETIC = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [active, setActive] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const applySort = type => {
    const sortedGoods = [...goodsFromServer];

    if (type === SORT_BY_ALPHABETIC) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === SORT_BY_LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setActive(type);
  };

  const reverseBtn = () => {
    setVisibleGoods(visibleGoods.toReversed());
    setIsReversed(!isReversed);
  };

  const resetBtn = () => {
    setActive('');
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
  };

  const originalGoods = () =>
    visibleGoods.length === goodsFromServer.length &&
    visibleGoods.every((item, i) => item === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': active !== SORT_BY_ALPHABETIC,
          })}
          onClick={() => applySort(SORT_BY_ALPHABETIC)}
        >
          {SORT_BY_ALPHABETIC}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': active !== SORT_BY_LENGTH,
          })}
          onClick={() => applySort(SORT_BY_LENGTH)}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => reverseBtn()}
        >
          Reverse
        </button>

        {!originalGoods() && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': active !== 'Reset',
            })}
            onClick={() => resetBtn()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
