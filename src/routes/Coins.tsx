import styled from "styled-components";
import bgVideo from "../video/clouds.mp4";

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
`;

const BgContainer = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
  & video {
    width: 100%;
  }
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
      </BgContainer>
      <ContentContainer></ContentContainer>
    </Container>
  );
}

export default Coins;
