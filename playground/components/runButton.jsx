import React, { useContext } from 'react';
import { Button, Icon } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';
import { withTheme } from 'styled-components';
// import styled from 'styled-components';
import { run } from '@htmllinter/core';

const RunButton = ({ ...props }) => {
  const { input, setLintingTree, setLinting, config } = useContext(AppContext);

  const transformCode = async () => {
    setLinting(true);

    const lintingData = await run(input, config);
    setLintingTree(lintingData);
    setLinting(false);
  };

  return (
    <Button
      style={{
        background: props.theme.primary,
        color: props.theme.btnTextColor,
        fontSize: props.theme.fontSize,
      }}
      onClick={transformCode}
    >
      <Icon icon="circle-arrow-right" color="success" marginRight={16} />
      Run
    </Button>
  );
};

export default withTheme(RunButton);
