import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Pomodoro from './Pomodoro';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Pomodoro />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
