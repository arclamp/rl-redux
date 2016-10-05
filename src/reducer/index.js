import Immutable from 'immutable';

import { makeEnum } from '../util';
import { actionType } from '../action';

const appMode = makeEnum('appMode', [
  'startScreen',
  'project',
  'projectSettings',
  'datasetStatus',
  'matchingStatus',
  'visualizationStatus',
  'visualizationExport',
  'datasetSettings',
  'helpScreen'
]);

const initial = Immutable.Map({
  mode: appMode.startScreen,
  name: Immutable.Map({
    mode: 'name',
    name: 'Untitled (47)'
  })
});

const reducer = (state = initial, action = {}) => {
  let newState = state;

  switch (action.type) {
    case actionType.switchMode:
      newState = newState.set('mode', action.mode);
      break;

    case actionType.saving:
      newState = newState.withMutations(m => {
        m.setIn(['name', 'mode'], 'saving')
          .setIn(['name', 'name'], 'Saving...');
      });
      break;

    case actionType.changeName:
      newState = newState.withMutations(m => {
        m.setIn(['name', 'mode'], 'name')
          .setIn(['name', 'name'], action.name);
      });
      break;
  }

  return newState;
};

export {
  appMode
};

export default reducer;
