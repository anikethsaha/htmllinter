// eslint-disable-next-line no-unused-vars
import { Pane } from 'evergreen-ui';
import React, { Component } from 'react';
import { AppContext } from '../context/AppContext';

import CodeMirror from 'react-codemirror';
import { ToolboxHeading } from './style';
import styled, { withTheme } from 'styled-components';

const Editor = styled(CodeMirror)`
  background: ${(props) => props.theme.bg};
  height: 100%;
  width: 100%;
  border: none;
  box-shadow: 'none';
  font-size: ${(props) => props.theme.fontSize};
`;

class InputArea extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'htmlmixed',
    };
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
        <ToolboxHeading>Input</ToolboxHeading>
        <Pane
          height={'100%'}
          width={'100%'}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Editor
            value={this.context.input || ''}
            alignItems="center"
            justifyContent="center"
            onChange={(val) => this.context.setInput(val)}
            options={options}
          />
        </Pane>
      </div>
    );
  }
}

export default withTheme(InputArea);
