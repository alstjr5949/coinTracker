import styled, { keyframes } from "styled-components";

const coinAnimation = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`;
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${coinAnimation} 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    infinite;
  transform-style: preserve-3d;
  perspective: 4000px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
`;

const Shadow = styled.div`
  position: absolute;
  bottom: 35%;
  left: 50%;
  width: 25px;
  height: 25px;
  background: black;
  opacity: 0.6;
  filter: blur(50px);
  transform: rotateX(90deg);
`;

function Loading() {
  return (
    <Container>
      <Img src="https://cryptoicon-api.vercel.app/api/icon/btc"></Img>
      <Shadow />
    </Container>
  );
}

export default Loading;
