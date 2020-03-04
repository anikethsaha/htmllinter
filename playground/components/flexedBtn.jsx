import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { Pane, Button } from 'evergreen-ui';

class FlexBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme } = this.props;
    return (
      <Pane alignItems="center" background={theme.bg} display="flex">
        <Button
          marginRight={12}
          height={32}
          style={
            this.props.styling || {
              fontSize: theme.fontSize,
              background: theme.primary,
              color: theme.btnTextColor,
            }
          }
          onClick={this.props.onClickHandler}
        >
          {this.props.children}
        </Button>
      </Pane>
    );
  }
}

export default withTheme(FlexBtn);
