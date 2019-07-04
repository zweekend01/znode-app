import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Button } from 'antd';

import styles from './index.less';
import Http from '../../config/http';

class Home extends Component {
  state = {
    name: 'This is Hemoe!'
  };

  onRequest = async () => {
    await Http.request({ url: '/api', needToken: false });
  }

  render () {
    const { name } = this.state;

    return (
      <div>
        <h1>{name}</h1>
        <Button type="primary" onClick={this.onRequest}>发起请求</Button>
      </div>
    );
  }
}

export default CSSModules(Home, styles);
