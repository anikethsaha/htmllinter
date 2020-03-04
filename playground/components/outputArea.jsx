import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { Pane, Text, Heading } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';
import { ToolboxHeading, textAreaInsidePanel } from './style';

import dynamic from 'next/dynamic';
import { withTheme } from 'styled-components';
// Transform the input here and show the metadata about the input

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

const OutputArea = ({ ...props }) => {
  const { input, linting, lintingTree } = useContext(AppContext);
  const RenderTree = () => {
    return (
      <ReactJson style={{ width: '100%', height: '100%' }} src={lintingTree} />
    );
  };

  return (
    <div
      style={{
        height: '100%',
        background: props.theme.bg,
        borderRadius: '2px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: '100%',
      }}
    >
      <ToolboxHeading>
        <Heading
          size={600}
          style={{ lineHeight: '1rem', display: 'flex', flexGrow: 2 }}
        >
          Output
        </Heading>
      </ToolboxHeading>
      <Pane
        style={{ padding: '1rem' }}
        height={'100%'}
        width={'100%'}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          id="textarea-2"
          height={'100%'}
          width={'100%'}
          border={'none'}
          display="flex"
          style={textAreaInsidePanel}
          alignItems="center"
          justifyContent="center"
        >
          {linting === false && input ? <RenderTree /> : <RenderTree />}
        </Text>
      </Pane>
    </div>
  );
};

export default withTheme(OutputArea);
