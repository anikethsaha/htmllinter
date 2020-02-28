import React, { Component } from 'react';
import { Pane, SideSheet, Heading, Card, Code } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';

export default class configPanel extends Component {
  static contextType = AppContext;
  componentDidMount() {}

  render() {
    return (
      <div>
        <SideSheet
          isShown={this.context.configPanel}
          onCloseComplete={() => this.context.setConfigPanel(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
          }}
          position={'left'}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16}>
              <Heading size={600}>
                <Code>htmllinter.config.js</Code>
              </Heading>
            </Pane>
          </Pane>
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            <Card
              backgroundColor="white"
              elevation={0}
              height={240}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading>Coming soon</Heading>
            </Card>
          </Pane>
        </SideSheet>
      </div>
    );
  }
}
