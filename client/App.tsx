import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { EventEmitter } from 'eventemitter3';
import { Spin } from 'antd';

import Home from './pages/Home';
import styles from './App.less';

export interface IAppProps {

}
export interface IAppState {
  loading: boolean;
  loadingText: string;
}

export default class App extends Component<IAppProps, IAppState> {
  state: IAppState = {
    loading: false,
    loadingText: ''
  };

  componentDidMount() {
    // 设置全局的EventBus,挂载在window上
    // window.eventEmitter = new EventEmitter();
    // window.eventEmitter.on('startLoading', this.onStartLoading);
    // window.eventEmitter.on('stopLoading', this.onStopLoading);
  }

  componentWillUnmount() {
    // window.eventEmitter = null;
  }

  onStartLoading = (loadingText: string) => {
    this.setState({ loadingText, loading: true });
  }

  onStopLoading = () => {
    this.setState({ loading: false, loadingText: '' });
  }

  render() {
    const { loading, loadingText } = this.state;

    return (
      <div styleName="wrapper">
        <Spin
          wrapperClassName={styles.spinWrapper}
          spinning={loading}
          tip={loadingText}
          size="large"
        >
          <Home />
        </Spin>
      </div>
    );
  }
}

// export default hot(CSSModules(App, styles));
