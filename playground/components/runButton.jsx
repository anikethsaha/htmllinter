import React, { useContext } from 'react';

import { AppContext } from '../context/AppContext';
import { withTheme } from 'styled-components';
// import styled from 'styled-components';
import { run } from '@htmllinter/core';
import { ActionButton } from './style';
import { FiPlay } from 'react-icons/fi';

const RunButton = () => {
  const { input, setLintingTree, setLinting, config } = useContext(AppContext);

  const transformCode = async () => {
    setLinting(true);

    const lintingData = await run(input, config);
    setLintingTree(lintingData);
    setLinting(false);
  };

  return (
    <ActionButton onClick={transformCode}>
      <FiPlay />
    </ActionButton>
  );
};

export default withTheme(RunButton);
