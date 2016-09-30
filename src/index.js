import { select } from 'd3-selection';

import page from './template/page.jade';
import { observeStore } from './store';

const report = (state) => {
  console.log('[report]');
  console.log(state.toJS());
}

window.onload = () => {
  select(document.body)
    .html(page());

  observeStore(report);
};
