import React, { useState } from 'react';
import Header from '../components/layout/header';
import Body from '../components/layout/body';
import Main from '../components/main';
import { AppContext } from '../context/AppContext';
import basicConfig from '@htmllinter/basic-config';

function Index() {
  const initialConfig = {
    extend: basicConfig,
  };
  const [input, setInput] = useState('');
  const [lintingTree, setLintingTree] = useState([]);
  const [linting, setLinting] = useState(false);
  const [configPanel, setConfigPanel] = useState(false);
  const [config, setConfig] = useState(initialConfig);
  return (
    <AppContext.Provider
      value={{
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
      <Body>
        <Header />
        <Main />
      </Body>
    </AppContext.Provider>
  );
}
export default Index;
