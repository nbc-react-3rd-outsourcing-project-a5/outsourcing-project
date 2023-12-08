import React from 'react';
import styled from 'styled-components';

function KakaoMapOverlay() {
  return (
    <StWrap class="overlaybox">
      <div class="boxtitle">금주 영화순위</div>
      <div class="first">
        <div class="triangle text">1</div>
        <div class="movietitle text">드래곤 길들이기2</div>
      </div>
      <ul>
        <li class="up">
          <span class="number">2</span>
          <span class="title">명량</span>
          <span class="arrow up"></span>
          <span class="count">2</span>
        </li>
      </ul>
    </StWrap>
  );
}

const StWrap = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
`;

export default KakaoMapOverlay;
