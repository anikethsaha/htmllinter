import { Pane, Heading } from 'evergreen-ui';
import React, { Component } from 'react';
import { ToolboxHeading } from './style';

import dynamic from 'next/dynamic';
import { AppContext } from '../context/AppContext';
import { withTheme } from 'styled-components';

// Transform the input here and show the metadata about the input

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

class ConfigViewPanel extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          height: '100%',
          background: this.props.theme.bg,
          borderRadius: '2px',
          borderRight: '5px solid #0052cc',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          width: '100%',
        }}
      >
        <ToolboxHeading>
          <Heading
            size={600}
            style={{ lineHeight: '1rem', display: 'flex', flexGrow: 2 }}
          >
            Config
          </Heading>
        </ToolboxHeading>

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

export default withTheme(ConfigViewPanel);
