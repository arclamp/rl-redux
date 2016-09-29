import Immutable from 'immutable';

import { makeEnum } from '../util';
import { actionType } from '../action';

const applicationMode = makeEnum([
  'startScreen'
]);

const initial = Immutable.Map({
  mode: applicationMode.startScreen
});

const reducer = (state = initial, action = {}) => {
  let newState = state;

  switch (action.type) {
    case actionType.switchMode:
      newState = newState.set('mode', action.mode);
      break;
  }

  return newState;
};

export {
  applicationMode
};

export default reducer;