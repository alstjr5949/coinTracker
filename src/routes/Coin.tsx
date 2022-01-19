import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
  margin-top: 10vh;
`;

const ChartBox = styled.div``;

const ListBox = styled.div``;

const CoinListHeader = styled.div``;

const CoinUl = styled.ul``;

const CoinLi = styled.li``;

function Coin() {
  return (
    <Container>
      <ContentBox>
        <ChartBox></ChartBox>
        <ListBox>
          <CoinListHeader></CoinListHeader>
          <CoinUl>
            <CoinLi></CoinLi>
          </CoinUl>
        </ListBox>
      </ContentBox>
    </Container>
  );
}

export default Coin;
