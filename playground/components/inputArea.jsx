// eslint-disable-next-line no-unused-vars
import { Pane, Textarea, Heading, Code } from 'evergreen-ui';
import React, { Component } from 'react';
import { headingInsidePanel, textAreaInsidePanel } from './style';

class InputArea extends Component {
  constructor(props) {
    super(props);
  }

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
        <Heading style={headingInsidePanel}>Input</Heading>
        <Pane
          height={'100%'}
          width={'100%'}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Textarea
            id="textarea-2"
            height={'100%'}
            width={'100%'}
            border={'none'}
            display="flex"
            style={{ ...textAreaInsidePanel, background: '#F4F5F7' }}
            alignItems="center"
            justifyContent="center"
            onChange={this.props.handeInputChange}
          />
        </Pane>
      </div>
    );
  }
}

export default InputArea;
