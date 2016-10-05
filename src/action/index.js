import { makeEnum } from '../util';

const actionType = makeEnum('actionType', [
  'switchMode'
]);

const action = Object.freeze({
  switchMode: (mode) => ({
    type: actionType.switchMode,
    mode
  })
});

export {
  actionType,
  action
};
