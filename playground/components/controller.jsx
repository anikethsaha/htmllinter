import { Pane, Heading } from 'evergreen-ui';
import React, { Component } from 'react';
import { ToolboxHeading } from './style';
import { AppContext } from '../context/AppContext';
import { withTheme } from 'styled-components';
import ConfigViewController from './configView.controller';
import ConfigEditController from './configEdit.controller';
// Transform the input here and show the metadata about the input

const RenderControllerItem = ({ ...props }) => {
  // eslint-disable-next-line no-warning-comments
  // FIXME : need codesplitting here
  if (props.item === 'configView') {
    return <ConfigViewController />;
  }
  if (props.item === 'configEdit') {
    return <ConfigEditController />;
  }
};

class Controller extends Component {
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
            {this.context.controllerItem}
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
          <RenderControllerItem item={this.context.controllerItem} />
        </Pane>
      </div>
    );
  }
}

export default withTheme(Controller);
