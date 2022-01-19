import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchAllCoinTickers } from "../api";
import bgVideo from "../video/clouds.mp4";

const Loader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

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
    font-size: 80px;
    font-weight: 600;
    color: ${(props) => props.theme.bgColor};
    letter-spacing: 5px;
    text-shadow: -1px -1px 2px rgba(150, 150, 150, 1);
    &:last-child {
      font-size: 20px;
      font-weight: 300;
      opacity: 0.7;
      letter-spacing: 1px;
      text-shadow: none;
    }
  }
`;

const BgBtn = styled.span`
  position: absolute;
  width: 140px;
  top: 60%;
  left: 100px;
  color: ${(props) => props.theme.bgColor};
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  border-bottom: 1px solid white;
  transition: all 0.5s ease-in-out;
  &:hover {
    width: 300px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 100px;
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const ContentTitle = styled.div`
  width: 20%;
  font-size: 40px;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  color: black;
`;

const CoinsBox = styled.ul`
  width: 100%;
  height: 90%;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const CoinBox = styled.li<{ percent: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 18px;
  a {
    width: 45%;
    display: flex;
    align-items: center;
    color: black;
    font-weight: 400;
  }
  div {
    width: 55%;
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    & span {
      color: ${(props) =>
        props.percent ? props.theme.textColor : props.theme.accentColor};
    }
    & span:first-child {
      margin-right: 30px;
    }
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coins() {
  const { isLoading, data } = useQuery<PriceData[]>(
    "allTickers",
    fetchAllCoinTickers
  );
  return (
    <Container>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <Container>
          <BgContainer>
            <video muted autoPlay loop>
              <source src={bgVideo} type="video/mp4" />
            </video>
            <BgText>
              <span>Simple</span>
              <span>Coin Info.</span>
              <span>간단히 살펴보는 코인정보 사이트</span>
            </BgText>
            <Link to="/btc-bitcoin">
              <BgBtn>Look Around &rarr;</BgBtn>
            </Link>
          </BgContainer>
          <ContentContainer>
            <TitleContainer>
              <ContentTitle>코인시세</ContentTitle>
            </TitleContainer>
            <CoinsBox>
              {data?.slice(0, 24).map((coin) => (
                <CoinBox
                  key={coin.id}
                  percent={coin.quotes.USD.percent_change_15m < 0}
                >
                  <Link
                    to={`/${coin.id}`}
                    state={{ name: coin.name, rank: coin.rank }}
                  >
                    <Img
                      src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      alt={coin.id}
                    />
                    {coin.name}
                  </Link>
                  <div>
                    <span>{coin.quotes.USD.price.toFixed(2)} USD</span>
                    <span>{coin.quotes.USD.percent_change_15m} %</span>
                  </div>
                </CoinBox>
              ))}
            </CoinsBox>
          </ContentContainer>
        </Container>
      )}
    </Container>
  );
}

export default Coins;
