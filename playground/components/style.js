import styled from 'styled-components';
import { Heading } from 'evergreen-ui';

export const ToolboxHeading = styled(Heading)`
  display: flex;
  flex-shrink: 0;
  height: 38px;
  overflow: hidden;
  background: ${(props) => props.theme.toolboxHeading};
  padding: 0.5rem 1rem;
`;

export const textAreaInsidePanel = {
  border: 'none',
  boxShadow: 'none',
  fontSize: '1.2rem',
};
