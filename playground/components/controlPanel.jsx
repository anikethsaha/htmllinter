import React, { Component } from 'react';
import { Pane, Icon, Tooltip } from 'evergreen-ui';
import { withTheme } from 'styled-components';
import FlexedBtn from './flexedBtn';
import { AppContext } from '../context/AppContext';

class controlPanel extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }

  render() {
    const { theme } = this.props;
    return (
      <Pane
        display="flex"
        padding={0}
        style={{ height: '100%', flexDirection: 'column' }}
        background={theme.bg}
        borderRadius={3}
      >
        <FlexedBtn
          styling={{
            background: 'transparent',
            color: theme.textColor,
            boxShadow: 'none',
            margin: 'auto',
          }}
          onClickHandler={() => this.context.setConfigPanel(true)}
        >
          <Tooltip content="Edit linter config">
            <Icon icon="settings" margin={5} />
          </Tooltip>
        </FlexedBtn>
      </Pane>
    );
  }
}
export default withTheme(controlPanel);
