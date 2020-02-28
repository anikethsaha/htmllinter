import { Pane, Heading } from 'evergreen-ui';
import React, { Component } from 'react';
import { headingInsidePanel } from './style';

import dynamic from 'next/dynamic';
import { AppContext } from '../context/AppContext';
// Transform the input here and show the metadata about the input

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

export default class ConfigViewPanel extends Component {
  static contextType = AppContext;

  render() {
    return (
      <div
        style={{
          height: '100%',
          background: '#F4F5F7',
          borderRadius: '2px',
          borderRight: '5px solid #0052cc',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          width: '100%',
        }}
      >
        <Heading style={headingInsidePanel}>Config </Heading>
        <Pane
          height={'100%'}
          width={'100%'}
          padding={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ReactJson
            style={{ width: '100%', height: '100%' }}
            src={this.context.config}
          />
        </Pane>
      </div>
    );
  }
}
