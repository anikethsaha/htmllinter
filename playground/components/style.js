import styled from 'styled-components';
import { Button } from 'evergreen-ui';

export const ToolboxHeading = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 1.5rem;
  overflow: hidden;
  background: ${(props) => props.theme.toolboxHeading};
  padding: 0.5rem 1rem;
`;

export const textAreaInsidePanel = {
  border: 'none',
  boxShadow: 'none',
  fontSize: '1.2rem',
};

export const StyledIconButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 16px;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.btnTextColor};
  font-size: ${(props) => props.theme.fontSize};
`;

export const ActionButton = styled.button`
  display: flex;
  width: 35px;
  font-size: 1.5rem;
  padding: 0;
  margin: auto;
  background: transparent;
  border: none;
  box-shadow: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.primary};
  cursor: pointer;
`;
