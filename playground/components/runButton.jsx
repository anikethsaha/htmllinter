import React, { useContext } from 'react';
import { Button, Icon } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';
import { run } from '@htmllinter/core';

const RunButton = () => {
  const { input, setLintingTree, setLinting, config } = useContext(AppContext);

  const transformCode = async () => {
    setLinting(true);

    const lintingData = await run(input, config);
    setLintingTree(lintingData);
    setLinting(false);
  };

  return (
    <Button
      style={{ background: '#0052cc', color: 'white', fontSize: '1rem' }}
      onClick={transformCode}
    >
      <Icon icon="circle-arrow-right" color="success" marginRight={16} />
      Run
    </Button>
  );
};

export default RunButton;
