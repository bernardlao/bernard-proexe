import React from 'react';
import styled from 'styled-components';

const PageNotFound: React.FC = () => {
  return (
    <PageNotFoundContainer>Page Not Found</PageNotFoundContainer>
  )
}

export default PageNotFound;

const PageNotFoundContainer = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 32px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`