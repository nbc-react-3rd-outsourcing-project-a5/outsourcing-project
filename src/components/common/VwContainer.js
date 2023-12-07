import styled from 'styled-components';

const VwContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.backgroundColor};
`;

export default VwContainer;
