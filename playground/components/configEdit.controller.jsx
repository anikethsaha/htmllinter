import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { Pane, Heading } from 'evergreen-ui';
import { AppContext } from '../context/AppContext';

const Select = styled.select`
  width: 100%;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.secondaryBg};
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: 5px;
`;

const Option = styled.option`
  width: 100%;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.secondaryBg};
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: 5px;
`;

const FieldsContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 5px auto;
`;

const FieldBtn = styled.button`
  background: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

const Field = ({ ...props }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Heading size={500} style={{ marginBottom: '5px' }}>
        {props.ruleName}
      </Heading>
      <FieldsContainer>
        <Select>
          <Option value="off">{'off'}</Option>
          <Option value="on">{'on (current)'}</Option>
        </Select>
      </FieldsContainer>
    </div>
  );
};

class ThemeController extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isStoring: false,
      rules: [],
    };
  }

  componentDidMount() {
    let rules = [];
    Object.keys(this.context.config).map(async (prop) => {
      if (prop === 'extend') {
        await Object.keys(this.context.config[prop].rules).map((rule) =>
          rules.push(rule)
        );
      }
      if (prop === 'plugins' && this.context.config[prop].length > 0) {
        await Object.keys(this.context.config.plugins).map((rule) =>
          rules.push(rule)
        );
      }
    });
    this.setState(
      {
        rules,
      },
      () => console.log('--------:', this.state.rules, rules)
    );
  }

  render() {
    const { rules } = this.state;
    return (
      <Pane
        display="flex"
        padding={0}
        style={{ flexDirection: 'column', width: '100%', height: '100%' }}
      >
        {rules.map((rule, i) => {
          return <Field key={i} ruleName={rule} />;
        })}
        <FieldBtn onClick={this.storeThemeInLS}>
          {this.state.isStoring ? 'Saving....' : 'Save'}
        </FieldBtn>
      </Pane>
    );
  }
}

export default withTheme(ThemeController);
