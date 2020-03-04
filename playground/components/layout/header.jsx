import React, { Component } from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

// eslint-disable-next-line no-unused-vars
import { Pane, Button, Text, Heading, Link, Icon, Badge } from 'evergreen-ui';

import { AppContext } from '../../context/AppContext';
import fetch from 'isomorphic-unfetch';
import styled, { withTheme } from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: auto 1rem;
`;

const StyledHeader = styled.header`
  height: 2rem;
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

          <Pane>
            <Pane>
              <Pane flex={1} alignItems="center" padding={8} display="flex">
                <StyledLink href="https://github.com/anikethsaha/htmllinter">
                  <FaGithub />
                </StyledLink>
                <StyledLink href="https://twitter.com/__ANIX__">
                  <FaTwitter />
                </StyledLink>
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
