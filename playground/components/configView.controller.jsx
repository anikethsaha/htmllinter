import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import { AppContext } from '../context/AppContext';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

class ConfigViewController extends Component {
  static contextType = AppContext;
  render() {
    return (
      <ReactJson
        style={{ width: '100%', height: '100%' }}
        src={this.context.config}
      />
    );
  }
}
export default ConfigViewController;
