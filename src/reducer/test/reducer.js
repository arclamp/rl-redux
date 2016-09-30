import test from 'tape-catch';

import reducer, { applicationMode } from '..';
import { actionType,
         action } from '../../action';

test('top-level reducer', t => {
  t.ok(reducer, 'reducer function imported properly');

  let initState = reducer();
  t.equals(initState.get('mode'), applicationMode.startScreen, 'Starting mode should be startScreen');

  let nextState = reducer(initState, action.switchMode(applicationMode.project));
  t.equals(nextState.get('mode'), applicationMode.project, 'Mode should change to "project"');

  t.end();
});
