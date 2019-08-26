import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './App.less';

class App extends Component<any, any> {

  render() {
    return (
      <div styleName="layout">
        Hello World
      </div>
    );
  }

}

export default hot(CSSModules(App, styles));
