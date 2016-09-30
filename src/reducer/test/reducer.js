import test from 'tape-catch';

import reducer, { appMode } from '..';
import { actionType,
         action } from '../../action';

test('top-level reducer', t => {
  t.ok(reducer, 'reducer function imported properly');

  let initState = reducer();
  t.equals(initState.get('mode'), appMode.startScreen, 'Starting mode should be startScreen');

  let nextState = reducer(initState, action.switchMode(appMode.project));
  t.equals(nextState.get('mode'), appMode.project, 'Mode should change to "project"');

  t.end();
});
