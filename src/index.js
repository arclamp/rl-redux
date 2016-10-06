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

    selectAll('.modal div').classed('hidden', function () {
      return !select(this).classed(which);
    });
  }
};

const render = (state) => {
  const mode = state.get('mode');

  if (mode === undefined || enumName(mode) !== 'appMode') {
    throw new Error(`mode value "${mode}" must be from appMode enum`);
  }

  let modal = enumValue(mode);
  if (modal === 'project') {
    modal = null;
  }

  activateModal(modal);
};

const renderName = (name) => {
  const nameElt = select('.header .name');
  const mode = name.get('mode');

  switch (mode) {
    case 'name':
      nameElt.text(name.get('name'))
        .attr('href', '#')
        .style('pointer-events', null)
      break;

    case 'saving':
      select('.header .name-choices')
        .classed('hidden', true);
      nameElt.text('Saving...')
        .attr('href', null)
        .style('pointer-events', 'none')
      break;

    default:
      throw new Error(`illegal name state "${mode}"`);
  }
};

const report = (state) => console.log('report', state.toJS());

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
  // Several to render the page in response to application data.
  observeStore(render);
  observeStore(renderName, (state) => state.get('name'));

  // One to dump application data to the console on each change.
  observeStore(report);

  // Attach redux actions to UI actions.
  //
  // Start screen links.
  attachAction('.startScreen .new-project', appMode.project);
  attachAction('.startScreen .start-with-dataset', appMode.selectDataset);
  attachAction('.startScreen .start-with-vis', appMode.selectVisualization);

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

  select('.header .name').on('click', () => {
    const ul = select('.name-choices');
    ul.classed('hidden', !ul.classed('hidden'));
  });

  selectAll('.name-choices .option').on('click', function () {
    const name = select(this).text();
    store.dispatch(action.saving());

    window.setTimeout(() => {
      store.dispatch(action.changeName(name));
    }, 1000);
  });

  // Background links.
  attachAction('.background .logo', appMode.startScreen);

  // Project settings modal links.
  attachAction('.projectSettings .dismiss', appMode.project);

  // Dataset panel links.
  attachAction('.dataset .settings', appMode.datasetSettings);
  attachAction('.dataset .change', appMode.selectDataset);
  attachAction('.dataset .help', appMode.helpScreen);
  attachAction('.dataset .status', appMode.datasetStatus);

  // Dataset status modal.
  attachAction('.datasetStatus .dismiss', appMode.project);

  // Dataset settings modal links.
  attachAction('.datasetSettings .dismiss', appMode.project);

  // Select dataset modal.
  select('.selectDataset .dismiss').on('click', () => {
    store.dispatch(action.switchMode(store.getState().get('lastMode')));
  });

  // Matching panel.
  attachAction('.matching .help', appMode.helpScreen);
  attachAction('.matching .status', appMode.matchingStatus);

  // Matching status modal.
  attachAction('.matchingStatus .dismiss', appMode.project);

  // Visualization panel.
  attachAction('.visualization .change', appMode.selectVisualization);
  attachAction('.visualization .help', appMode.helpScreen);
  attachAction('.visualization .status', appMode.visualizationStatus);
  attachAction('.visualization .export', appMode.visualizationExport);

  // Visualization status modal.
  attachAction('.visualizationStatus .dismiss', appMode.project);

  // Select visualization modal.
  select('.selectVisualization .dismiss').on('click', () => {
    store.dispatch(action.switchMode(store.getState().get('lastMode')));
  });

  // Export visualization modal.
  const downloader = (ext) => () => {
    console.log(`Downloading ${store.getState().getIn(['name', 'name'])}.${ext}`);
    store.dispatch(action.switchMode(appMode.project));
  };
  select('.visualizationExport .png').on('click', downloader('png'));
  select('.visualizationExport .svg').on('click', downloader('svg'));
  select('.visualizationExport .html').on('click', downloader('html'));
  attachAction('.visualizationExport .dismiss', appMode.project);

  // Help screen.
  attachAction('.helpScreen .dismiss', appMode.project);
};
