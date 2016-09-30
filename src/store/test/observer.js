import test from 'tape-catch';

import { createStore } from 'redux';

import { observe } from '..';
import reducer from '../../reducer';
import { action } from '../../action';

test('observe()', t => {
  let count = 0;
  const counter = () => count++;

  let store = createStore(reducer);
  let unsub = observe(store, counter, v => v);

  t.equal(count, 1, 'Store has not been engaged yet (besides initialization)');

  store.dispatch(action.switchMode(5));
  t.equal(store.getState().get('mode'), 5, 'Store was updated properly');
  t.equal(count, 2, 'Observer handler fired');

  store.dispatch(action.switchMode(5));
  t.equal(store.getState().get('mode'), 5, 'Store did not change');
  t.equal(count, 2, 'Observer handler did not fire');

  store.dispatch(action.switchMode(7));
  t.equal(store.getState().get('mode'), 7, 'Store was updated properly a second time');
  t.equal(count, 3, 'Observer handler fired');

  unsub();

  t.end();
});
