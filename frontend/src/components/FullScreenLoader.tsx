import React from 'react';
import styled from 'styled-components';

const FullScreenLoader: React.FC = () => {
  return (
    <Overlay>
      <LoaderWrapper>
        <Spinner>
          <InnerSpinner />
        </Spinner>
        <Message>
        AI is working ...
        </Message>
      </LoaderWrapper>
    </Overlay>
  );
};

export default FullScreenLoader;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderWrapper = styled.div`
  text-align: center;
`;

const Spinner = styled.div`
  background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
  width: 100px;
  height: 100px;
  animation: spinning 1.7s linear infinite;
  border-radius: 50px;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
  margin: 0 auto;

  @keyframes spinning {
    to {
      transform: rotate(360deg);
    }
  }
`;

const InnerSpinner = styled.div`
  background-color: rgb(36, 36, 36);
  width: 100px;
  height: 100px;
  border-radius: 50px;
  filter: blur(10px);
`;

const Message = styled.h2`
  margin-top: 20px;
font-size: 16px;
  background: -webkit-linear-gradient(#44eb81, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;