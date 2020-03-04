import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { Pane, Button, Text, Heading } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';
import InputArea from './inputArea';
import OutputArea from './outputArea';
import ConfigPanel from './configPanel';
import ConfigViewPanel from './configViewPanel';
import styled, { withTheme } from 'styled-components';
import ControlPanel from './controlPanel';

const Section = styled.section`
  width: 100%;
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  position: relative;
`;

const Main = ({ ...props }) => {
  const { setInput } = useContext(AppContext);
  const handeInputChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <Section>
      <ConfigPanel />
      <Pane
        display="flex"
        padding={0}
        background={props.theme.bg}
        borderRadius={3}
        style={{ width: '100%' }}
      >
        <Pane
          flex={1}
          alignItems="center"
          background={props.theme.bg}
          display="flex"
        >
          <ControlPanel />
        </Pane>
        <Pane
          flex={7}
          alignItems="center"
          background={props.theme.bg}
          display="flex"
        >
          <ConfigViewPanel />
        </Pane>
        <Pane flex={7} alignItems="center" display="flex">
          <InputArea handeInputChange={handeInputChange} />
        </Pane>
        <Pane
          flex={7}
          background={props.theme.bg}
          alignItems="center"
          display="flex"
        >
          <OutputArea />
        </Pane>
      </Pane>
    </Section>
  );
};

export default withTheme(Main);
