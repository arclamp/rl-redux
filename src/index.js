import { select,
         selectAll } from 'd3-selection';

import page from './template/page.jade';
import { store,
         observeStore } from './store';
import { appMode } from './reducer';
import { action } from './action';
import { enumName,
         enumValue } from './util';

import './style/index.styl';

const activateModal = (which) => {
  if (which === null) {
    selectAll('.modal div')
      .classed('hidden', true);

    select('.app')
      .classed('hidden', false);
  } else {
    select('.app')
      .classed('hidden', true);

    select(`.modal .${which}`)
      .classed('hidden', false);
  }
};

const render = (state) => {
  const mode = state.get('mode');

  if (enumName(mode) !== 'appMode') {
    throw new Error(`mode value "${mode}" must be from appMode enum`);
  }

  let modal = enumValue(mode);
  if (modal === 'project') {
    modal = null;
  }

  activateModal(modal);
};

const report = (state) => {
  console.log('[report]');
  console.log(state.toJS());
};

const attachAction = (selector, mode) => {
  const sel = select(selector)
    .on('click', () => store.dispatch(action.switchMode(mode)));

  sel.text(sel.text().slice(2));
};

window.onload = () => {
  // Instantiate main app template.
  select(document.body)
    .html(page());

  // Hook up the store to various handlers.
  //
  // One to render the page in response to application data.
  observeStore(render);

  // One to dump application data to the console on each change.
  observeStore(report);

  // Attach redux actions to UI actions.
  //
  // Start screen links.
  attachAction('.startScreen .new-project', appMode.project);

  // Header links.
  attachAction('.header .logo', appMode.startScreen);
  attachAction('.header .privacy', appMode.projectSettings);
  attachAction('.header .help', appMode.helpScreen);
  attachAction('.header .menu-content .settings', appMode.projectSettings);
  attachAction('.header .menu-content .close', appMode.startScreen);
  select('.header .menu').on('click', function () {
    const ul = select(this.parentNode)
      .select('ul');
    ul.classed('hidden', !ul.classed('hidden'));
  });

  // Background links.
  attachAction('.background .logo', appMode.startScreen);

  // Project settings modal links.
  attachAction('.projectSettings .dismiss', appMode.project);

  // Dataset panel links.
  attachAction('.dataset .settings', appMode.datasetSettings);
  attachAction('.dataset .help', appMode.helpScreen);

  // Dataset settings modal links.
  attachAction('.datasetSettings .dismiss', appMode.project);

  // Matching panel.
  attachAction('.matching .help', appMode.helpScreen);

  // Visualization panel.
  attachAction('.visualization .help', appMode.helpScreen);

  // Help screen.
  attachAction('.helpScreen .dismiss', appMode.project);
};
