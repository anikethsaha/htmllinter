import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { Pane, Button, Text, Heading } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';
import InputArea from './inputArea';
import OutputArea from './outputArea';
import ConfigPanel from './configPanel';

const Main = () => {
  const { setInput } = useContext(AppContext);
  const handeInputChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <section style={{ height: '100%', position: 'absolute', width: '100%' }}>
      <ConfigPanel />
      <Pane
        display="flex"
        padding={16}
        style={{ height: '100%' }}
        background="white"
        borderRadius={3}
      >
        <Pane
          flex={1}
          alignItems="center"
          style={{ height: '100%' }}
          display="flex"
        >
          <InputArea handeInputChange={handeInputChange} />
        </Pane>
        <Pane
          flex={1}
          alignItems="center"
          style={{ height: '100%' }}
          display="flex"
        >
          <OutputArea />
        </Pane>
      </Pane>
    </section>
  );
};

export default Main;
