import { select } from 'd3-selection';

import page from './template/page.jade';

window.onload = () => {
  select(document.body)
    .html(page());
};
