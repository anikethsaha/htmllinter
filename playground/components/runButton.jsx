import React, { useContext } from 'react';
import { Button, Icon } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';
import { run } from '@htmllinter/core';
import basicConfig from '@htmllinter/basic-config';

const RunButton = () => {
  const { input, setLintingTree, setLinting } = useContext(AppContext);

  const transformCode = async () => {
    setLinting(true);
    const config = {
      extend: basicConfig,
    };
    const lintingData = await run(input, config);
    setLintingTree(lintingData);
    setLinting(false);
  };

  return (
    <Button
      style={{ background: '#663399', color: 'white', fontSize: '1rem' }}
      onClick={transformCode}
    >
      <Icon icon="circle-arrow-right" color="success" marginRight={16} />
      Run
    </Button>
  );
};

export default RunButton;
