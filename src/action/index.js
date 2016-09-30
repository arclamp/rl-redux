import { makeEnum } from '../util';

const actionType = makeEnum([
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
}
