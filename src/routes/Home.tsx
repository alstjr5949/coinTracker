import { Link } from "react-router-dom";
import styled from "styled-components";
import bgVideo from "../video/clouds.mp4";

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
`;

const BgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
  & video {
    width: 100%;
  }
`;

const BgText = styled.div`
  position: absolute;
  top: 30%;
  left: 100px;
  display: flex;
  flex-direction: column;
  & span {
    font-size: 100px;
    font-weight: 700;
    color: ${(props) => props.theme.bgColor};
    letter-spacing: 5px;
    &:last-child {
      font-size: 25px;
      font-weight: 300;
      opacity: 0.7;
      letter-spacing: 1px;
    }
  }
`;

const BgBtn = styled.span`
  position: absolute;
  top: 60%;
  left: 100px;
  color: #0984e3;
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 50%;
`;

function Coins() {
  return (
    <Container>
      <BgContainer>
        <video muted autoPlay loop>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <BgText>
          <span>Simple</span>
          <span>Coin info.</span>
          <span>간단히 살펴보는 코인정보 사이트</span>
        </BgText>
        <Link to="/coins">
          <BgBtn>Look Around &rarr;</BgBtn>
        </Link>
      </BgContainer>
      <ContentContainer></ContentContainer>
    </Container>
  );
}

export default Coins;
