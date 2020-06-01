import { hot } from 'react-hot-loader/root';
import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './App.less';

const App = () => (
  <div styleName="red">
    hello app app app
  </div>
);

export default hot(CSSModules(App, styles));
