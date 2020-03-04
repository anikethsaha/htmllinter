import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Pane, Button, Text, Heading, Link, Icon, Badge } from 'evergreen-ui';

import RunButton from '../runButton';
import { AppContext } from '../../context/AppContext';
import fetch from 'isomorphic-unfetch';
import styled, { withTheme } from 'styled-components';

const StyledHeader = styled.header`
  height: 3rem;
  width: 100%;
  display: flex;
  flex-shrink: 0;
`;

class Header extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch(
      '//raw.githubusercontent.com/anikethsaha/htmllinter/master/playground/package.json'
    )
      .then((res) => res.json())
      .then((pkg) => this.context.setPlaygroundInfo(pkg));
  }

  render() {
    const { theme } = this.props;
    return (
      <StyledHeader>
        <Pane
          display="flex"
          paddingX={16}
          background={theme.bg}
          borderRadius={3}
          style={{ height: 'inherit', width: '100%' }}
        >
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600} style={{ letterSpacing: '.1rem' }}>
              HtmlLinter PlayGround
            </Heading>
            <Badge color="yellow" isSolid margin={10} marginY={15}>
              <code>v{this.context.playgroundInfo.version || ''}</code>
            </Badge>
          </Pane>
          <Pane flex={1} alignItems="center" display="flex">
            <RunButton />
          </Pane>
          <Pane>
            <Pane>
              <Pane flex={1} alignItems="center" padding={8} display="flex">
                <Link
                  href="https://github.com/anikethsaha/htmllinter"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    marginRight={16}
                    style={{
                      fontSize: theme.fontSize,
                      background: theme.primary,
                      color: theme.btnTextColor,
                    }}
                  >
                    Github
                  </Button>
                </Link>
              </Pane>
              {/* Below you can see the marginRight property on a Button. */}
            </Pane>
          </Pane>
        </Pane>
      </StyledHeader>
    );
  }
}

export default withTheme(Header);
