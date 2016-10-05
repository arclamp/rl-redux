import { makeEnum } from '../util';

const actionType = makeEnum('actionType', [
  'switchMode',
  'saving',
  'changeName'
]);

const action = Object.freeze({
  switchMode: (mode) => ({
    type: actionType.switchMode,
    mode
  }),

  saving: () => ({
    type: actionType.saving
  }),

  changeName: (name) => ({
    type: actionType.changeName,
    name
  })
});

export {
  actionType,
  action
};
