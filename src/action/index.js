import { makeEnum } from '../util';

const actionType = makeEnum([
  'switchMode'
]);

const switchMode = (mode) => ({
  type: actionType.switchMode,
  mode
});

export {
  actionType,

  switchMode
}
