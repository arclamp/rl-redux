import Immutable from 'immutable';

const modes = makeEnum([
  'startScreen'
]);

const initial = Immutable.Map({
  mode: modes.startScreen
});

const reducer = (state = initial, action = {}) => {
  let newState;

  switch (action.type) {
    case action.switchMode:
      newState = state.set('mode', action.mode);
      break;
  }

  return newState;
};
