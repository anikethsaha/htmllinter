import React, { Component } from 'react';
import {
  Pane,
  // eslint-disable-next-line no-unused-vars
  Text,
  Link,
  Strong,
  Code,
} from 'evergreen-ui';

const Brk = () => (
  <Strong size={500} style={{ margin: '0 .5rem' }}>
    |
  </Strong>
);

export default class Footer extends Component {
  render() {
    return (
      <Pane
        style={{ position: 'fixed', width: '100%', bottom: 0, height: '2rem' }}
      >
        <Pane
          display="flex"
          paddingX={16}
          background="tint2"
          style={{ height: 'inherit' }}
        >
          <Pane flex={1} alignItems="center" display="flex">
            <Text>
              Created by{' '}
              <Link href="https://twitter.com/__ANIX__">Aniketh Saha</Link>
              Using <Code>NextJs</Code> And <Code>evergreen-ui</Code>
              <Brk />
              <Code>htmllinter</Code> packages:{' '}
              <Link href="https://github.com/anikethsaha/htmllinter">
                @htmllinter/core <Code>v0.2.0</Code>
              </Link>
              <Brk />
              <Link href="https://github.com/anikethsaha/htmllinter">
                @htmllinter/basic-config <Code>v0.2.0</Code>
              </Link>
              <Brk />
              <Link href="https://github.com/anikethsaha/htmllinter">
                @htmllinter/basic-rules <Code>v0.2.0</Code>
              </Link>
            </Text>
          </Pane>
        </Pane>
      </Pane>
    );
  }
}
