import { select,
         selectAll } from 'd3-selection';

import page from './template/page.jade';
import { store,
         observeStore } from './store';
import { appMode } from './reducer';
import { action } from './action';

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
  switch (mode) {
    case appMode.startScreen:
      activateModal('startScreen');
      break;

    case appMode.newProject:
      activateModal('newProject');
      break;

    case appMode.openProject:
      activateModal('openProject');
      break;

    case appMode.changeDataset:
      activateModal('changeDataset');
      break;

    case appMode.changeVisualization:
      activateModal('changeVisualization');
      break;

    case appMode.projectSettings:
      activateModal('projectSettings');
      break;

    case appMode.datasetSettings:
      activateModal('datasetSettings');
      break;

    case appMode.helpScreen:
      activateModal('helpScreen');
      break;

    case appMode.project:
      activateModal(null);
      break;

    default:
      throw new Error(`illegal appMode: ${mode}`);
  }
};

const report = (state) => {
  console.log('[report]');
  console.log(state.toJS());
}

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
  attachAction('.startScreen .new-project', 'project');

  // Header links.
  attachAction('.header .logo', 'startScreen');
  attachAction('.header .privacy', 'projectSettings');
  attachAction('.header .help', 'helpScreen');
  attachAction('.header .menu-content .settings', 'projectSettings');
  attachAction('.header .menu-content .close', 'startScreen');
  select('.header .menu').on('click', function () {
    const ul = select(this.parentNode)
      .select('ul');
    ul.classed('hidden', !ul.classed('hidden'));
  });

  // Background links.
  attachAction('.background .logo', 'startScreen');

  // Project settings modal links.
  attachAction('.projectSettings .dismiss', 'project');

  // Dataset panel links.
  attachAction('.dataset .settings', 'datasetSettings');

  // Dataset settings modal links.
  attachAction('.datasetSettings .dismiss', 'project');

  // Help screen.
  attachAction('.helpScreen .dismiss', 'project');
};
