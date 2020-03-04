import React, { useState } from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import Main from '../components/main';
import { AppContext } from '../context/AppContext';
import basicConfig from '@htmllinter/basic-config';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100vh;
  flex-direction: column;
  background-color: ${(props) => props.theme.bg};
  font-family: Lato, sans-serif;
`;

function Index() {
  const initialConfig = {
    extend: basicConfig,
  };
  const [input, setInput] = useState('');
  const [lintingTree, setLintingTree] = useState([]);
  const [linting, setLinting] = useState(false);
  const [configPanel, setConfigPanel] = useState(false);
  const [config, setConfig] = useState(initialConfig);
  const [playgroundInfo, setPlaygroundInfo] = useState({});
  return (
    <AppContext.Provider
      value={{
        playgroundInfo,
        setPlaygroundInfo,
        config,
        setConfig,
        input,
        setInput,
        lintingTree,
        setLintingTree,
        linting,
        setLinting,
        configPanel,
        setConfigPanel,
      }}
    >
      <Container>
        <Header />
        <Main />
        <Footer />
      </Container>
    </AppContext.Provider>
  );
}
export default Index;
