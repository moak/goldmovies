import styled from 'styled-components';

const CardContainer = styled.div`
  height: ${(p) => p.height || 400}px;
  width: ${(p) => p.percent}%;
  display: flex;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
}`;

export default CardContainer;
