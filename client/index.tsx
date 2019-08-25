import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/app.module';
import 'regenerator-runtime/runtime';
import './styles/index.less';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

