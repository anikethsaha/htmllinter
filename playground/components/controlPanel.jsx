import React, { Component } from 'react';
import { Pane, Tooltip } from 'evergreen-ui';
import { withTheme } from 'styled-components';
import FlexedBtn from './flexedBtn';
import { AppContext } from '../context/AppContext';
import { FaRegEdit } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';

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
            margin: '1rem auto 0',
            fontSize: '1.5rem',
          }}
          onClickHandler={() => this.context.setControllerItem('configEdit')}
        >
          <Tooltip content="Edit linter config">
            <FaRegEdit />
          </Tooltip>
        </FlexedBtn>
        <FlexedBtn
          styling={{
            background: 'transparent',
            color: theme.textColor,
            boxShadow: 'none',
            margin: '1rem auto 0',
            fontSize: '1.5rem',
          }}
          onClickHandler={() => this.context.setControllerItem('configView')}
        >
          <Tooltip content="Show Current config">
            <FiCode margin={5} />
          </Tooltip>
        </FlexedBtn>
      </Pane>
    );
  }
}
export default withTheme(controlPanel);
